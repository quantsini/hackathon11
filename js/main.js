// Request Animation Frame shim
if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( callback, element ) {
                window.setTimeout( callback, 1000 / 60 );
            };
    } )();
}

var canvas, gl, buffer, currentProgram, vertexPosition,
parameters = { startTime: Date.now(), time: 0, mouseX: 0.5, mouseY: 0.5, screenWidth: 0, screenHeight: 0 },
surface = { centerX: 0, centerY: 0, width: 1, height: 1, lastX: 0, lastY: 0 },
frontTarget, backTarget, screenProgram, getWebGL, compileOnChangeCode = true;

init();
if (gl) { animate(); }

function init() {
    canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );

    // Initialise WebGL
    try {
        gl = canvas.getContext( 'experimental-webgl', { preserveDrawingBuffer: true } );
    } catch( error ) { }

    if ( !gl ) {
        alert("WebGL not supported, but code will be shown.");
    } else {

        // Create vertex buffer (2 triangles)
        buffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ - 1.0, - 1.0, 1.0, - 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0, 1.0, - 1.0, 1.0 ] ), gl.STATIC_DRAW );

        // Create surface buffer (coordinates at screen corners)
        surface.buffer = gl.createBuffer();
    }

    compile();
    
    document.addEventListener( 'mousemove', function ( event ) {
        parameters.mouseX = event.clientX / window.innerWidth;
        parameters.mouseY = 1 - event.clientY / window.innerHeight;
    }, false );

    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );
}

function computeSurfaceCorners() {
    if (gl) {
        surface.width = surface.height * parameters.screenWidth / parameters.screenHeight;
        
        var halfWidth = surface.width * 0.5, halfHeight = surface.height * 0.5;
        
        gl.bindBuffer( gl.ARRAY_BUFFER, surface.buffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [
            surface.centerX - halfWidth, surface.centerY - halfHeight,
            surface.centerX + halfWidth, surface.centerY - halfHeight,
            surface.centerX - halfWidth, surface.centerY + halfHeight,
            surface.centerX + halfWidth, surface.centerY - halfHeight,
            surface.centerX + halfWidth, surface.centerY + halfHeight,
            surface.centerX - halfWidth, surface.centerY + halfHeight ] ), gl.STATIC_DRAW );
    }
}

function compile() {
    if (!gl) { return; }
    
    var program = gl.createProgram();
    var fragment = document.getElementById( 'example' ).textContent;
    var vertex = document.getElementById( 'vertexShader' ).textContent;

    var vs = createShader( vertex, gl.VERTEX_SHADER );
    var fs = createShader( fragment, gl.FRAGMENT_SHADER );

    if ( vs == null || fs == null ) return null;

    gl.attachShader( program, vs );
    gl.attachShader( program, fs );

    gl.deleteShader( vs );
    gl.deleteShader( fs );

    gl.linkProgram( program );

    if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
        var error = gl.getProgramInfoLog( program );
        console.error( error );
        console.error( 'VALIDATE_STATUS: ' + gl.getProgramParameter( program, gl.VALIDATE_STATUS ), 'ERROR: ' + gl.getError() );
        return;
    }

    if ( currentProgram ) {
        gl.deleteProgram( currentProgram );
        setURL( fragment );
    }

    currentProgram = program;

    // Cache uniforms
    program.uniformsCache = {};
    var uniformNames = ['iGlobalTime', 'mouse', 'iResolution']
    for(var i = 0; i < uniformNames.length; i++)
    {
        var name = uniformNames[i];
        program.uniformsCache[ name ] = gl.getUniformLocation( program, name );
    }

    // Set up buffers
    vertexPosition = gl.getAttribLocation(currentProgram, "position");
    gl.enableVertexAttribArray( vertexPosition );
}

function createShader( src, type ) {

    var shader = gl.createShader( type );
    var line, lineNum, lineError, index = 0, indexEnd;

    gl.shaderSource( shader, src );
    gl.compileShader( shader );

    if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
        var error = gl.getShaderInfoLog( shader );
        console.error( error );
        return null;
    }
    return shader;
}

function onWindowResize( event ) {
    var quality = 1; // increase for more pixellated but faster rendering
    canvas.width = window.innerWidth / quality;
    canvas.height = window.innerHeight / quality;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    parameters.screenWidth = canvas.width;
    parameters.screenHeight = canvas.height;

    computeSurfaceCorners();

    if (gl) { gl.viewport( 0, 0, canvas.width, canvas.height );}
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    if ( !currentProgram ) return;

    parameters.time = Date.now() - parameters.startTime;

    // Use our shader program
    gl.useProgram( currentProgram );

    // Update the uniforms
    gl.uniform1f( currentProgram.uniformsCache[ 'iGlobalTime' ], parameters.time / 1000 );
    gl.uniform2f( currentProgram.uniformsCache[ 'mouse' ], parameters.mouseX, parameters.mouseY );
    gl.uniform3f( currentProgram.uniformsCache[ 'iResolution' ], parameters.screenWidth, parameters.screenHeight, 0 );

    // Vertex shader from http://glsl.heroku.com/ is slightly odd in that it takes
    // both uniform position and screen space position. I think I can get rid of this
    // with a small amount of work.
    gl.bindBuffer( gl.ARRAY_BUFFER, surface.buffer );
    gl.vertexAttribPointer( surface.positionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.vertexAttribPointer( vertexPosition, 2, gl.FLOAT, false, 0, 0 );

    // Clear the screen, then render a big quad over the whole thing
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}