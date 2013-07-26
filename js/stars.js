(function() {

var canvas, gl, parameters, buffer;

var NUM_POINTS = 20000;

var lines = "/yelp\nhackathon/4k\nwebgl\ndemo/by:\ncpaul\nhbai/klange\nmgrounds\nspernste/in only\n3961\nbytes/[BURST]".split('/');
//var lines = "/mgrounds/spernste/[BURST]".split('/');
var burstIndex = lines.length - 1;
var quats = [];
var lineTexs = [];

function init() {
    canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );

    gl = canvas.getContext( 'experimental-webgl', { preserveDrawingBuffer: true } );

    with (canvas) {
        width = style.width = document.innerHeight;
        height = style.height = document.innerHeight;
        gl.viewport(0, 0, width, height);
    }

    // Create vertex buffer (2 triangles)
    buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    var z1 = -0.1;
    var z2 = 0.1;
    var points = [];
    for (var i = 0; i < NUM_POINTS; ++i) {
        var x = 99;
        var y = 99;
        var z = 99;
        while (x*x + y*y + z*z > 1) {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            z = Math.random() * 2 - 1;
        }

        points.push(x);
        points.push(y);
        points.push(z);
    }
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(points),gl.STATIC_DRAW);

    for (var i = 0; i < lines.length; ++i) {
        var x = Math.random() * 2 - 1;
        var y = Math.random() * 2 - 1;
        var z = Math.random() * 2 - 1;
        var w = Math.random() * 2 - 1;
        quats.push({x:x,y:y,z:z,w:w});

        lineTexs.push(renderText(lines[i]));
    }

    //gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    parameters = { startTime: Date.now(), time: 0, screenWidth: 0, screenHeight: 0 }
}

function renderText(text) {
    function getPowerOfTwo(value, pow) {
        var pow = pow || 1;
        while(pow<value) {
            pow *= 2;
        }
        return pow;
    }

    var texCanvas = document.createElement('canvas');
    texCanvas.width = 256;
    texCanvas.height = 256;

    var ctx = texCanvas.getContext('2d');
    
    ctx.font = "36px monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var metrics = ctx.measureText(text);

    var lines = text.split('\n');
    var lineHeight = 40;
    var topY = (256 - lineHeight * (lines.length - 1)) / 2;
    for (var i = 0; i < lines.length; ++i) {
        ctx.fillText(lines[i], 128,  topY + lineHeight * i);
    }

    return makeTexture(texCanvas);
}

function makeTexture(img) {
    var texName;

    with(gl) {
        texName = createTexture();
        bindTexture(TEXTURE_2D, texName);
        pixelStorei(UNPACK_FLIP_Y_WEBGL, true);
        texImage2D(TEXTURE_2D, 0, RGBA, RGBA, UNSIGNED_BYTE, img);

        texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, LINEAR);
        texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, LINEAR);

        bindTexture(TEXTURE_2D, null);
    }

    return texName;
}

function onWindowResize( event ) {
    var quality = 1; // increase for more pixellated but faster rendering
    canvas.width = window.innerHeight / quality;
    canvas.height = window.innerHeight / quality;

    canvas.style.width = window.innerHeight + 'px';
    canvas.style.height = window.innerHeight + 'px';

    parameters.screenWidth = canvas.height;
    parameters.screenHeight = canvas.height;

    gl.viewport( 0, 0, canvas.height, canvas.height );
}

function compileProg(vertex, fragment) {
    with (gl) {
        var program = createProgram();

        function createShader_(src, type) {
            var shader = createShader( type );
            var line, lineNum, lineError, index = 0, indexEnd;

            shaderSource( shader, src );
            compileShader( shader );

            if ( !getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
                var error = getShaderInfoLog( shader );
                console.error( error );
                return null;
            }
            return shader;
        }

        var vs = createShader_( vertex, VERTEX_SHADER );
        var fs = createShader_( fragment, FRAGMENT_SHADER );

        if ( vs == null || fs == null ) return null;

        attachShader( program, vs );
        attachShader( program, fs );

        deleteShader( vs );
        deleteShader( fs );

        linkProgram( program );

        if ( !getProgramParameter( program, LINK_STATUS ) ) {
            var error = getProgramInfoLog( program );
            console.error( error );
            console.error( 'VALIDATE_STATUS: ' + getProgramParameter( program, VALIDATE_STATUS ), 'ERROR: ' + getError() );
            return;
        }

        // Cache uniforms
        program.uniformsCache = {};
        var uniformNames = ['iGlobalTime', 'mouse', 'iResolution', 'rotateInterp', 'rotateFrom', 'rotateTo'];
        for(var i = 0; i < uniformNames.length; i++)
        {
            var name = uniformNames[i];
            program.uniformsCache[ name ] = getUniformLocation( program, name );
        }

        // Set up buffers
        program.vertexPosition = getAttribLocation(program, "position");

        return program;
    }
}

function animate() {
    parameters.time = Date.now();
    render();
    requestAnimationFrame( animate );
}

var yelpTex;
var rocksTex;

function render() {
    var program = starShader;

    var delta = parameters.time - parameters.startTime;
    var base = Math.floor(delta / 2000) + lines.length - 1;

    // Use our shader program
	gl.enableVertexAttribArray( program.vertexPosition );
    gl.useProgram( program );

    function handle(uniform, idx) {
        gl.activeTexture(gl.TEXTURE0 + idx);
        gl.bindTexture(gl.TEXTURE_2D, lineTexs[(base + idx) % lines.length]);
        gl.uniform1i(gl.getUniformLocation(program, "samp" + uniform), idx);

        var q = quats[(base + idx) % lines.length];
        gl.uniform4f(gl.getUniformLocation(program, "rotate" + uniform), q.x, q.y, q.z, q.w);
    }

    "Old,From,To,New".split(',').map(handle);
    var burstness = (base - burstIndex + 2 + lines.length) % lines.length;
    gl.uniform1i(gl.getUniformLocation(program, "burstness"), burstness);

    // Update the uniforms
    gl.uniform1f( program.uniformsCache[ 'iGlobalTime' ], delta / 1000 );
    gl.uniform2f( program.uniformsCache[ 'mouse' ], parameters.mouseX, parameters.mouseY );
    gl.uniform3f( program.uniformsCache[ 'iResolution' ], parameters.screenWidth, parameters.screenHeight, 0 );

    gl.uniform1f( gl.getUniformLocation(program, 'interp'), delta / 1000 % 2);

    // Simple vertex shader that just takes 2D position
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.vertexAttribPointer( program.vertexPosition, 3, gl.FLOAT, false, 0, 0 );

    // Clear the screen, then render a big quad over the whole thing
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, NUM_POINTS );
}


init();
var starShader = compileProg(getAsset('shaders/stars.vert'), getAsset('shaders/stars.frag'));

onWindowResize();
window.addEventListener( 'resize', onWindowResize, false );
animate();

var img = document.createElement('img');
img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(getAsset('img/yelp.svg')));
img.style.display = 'none';
img.onload = function() {
    lineTexs[burstIndex] = makeTexture(img); console.log('image loaded'); };
document.body.appendChild(img);

})();
