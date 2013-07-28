(function() {

var NUM_POINTS = 20000;

var lines = '/yelp\nhackathon/4k\nwebgl\ndemo/by:\ncpaul\nhbai/klange\nmgrounds\nspernste/in only\n3945\nbytes/[BURST]'.split('/');
var numLines = lines.length;
var burstIndex = numLines - 1;
var quats = [];
var lineTexs = [];

var create = document.createElement.bind(document);

function makeContext(show) {
    var canvas = create('canvas');
    if (show)
        document.body.appendChild(canvas);
    var gl = canvas.getContext( 'experimental-webgl', { preserveDrawingBuffer: true } );;
    canvas.width = canvas.height = 512;
    gl.viewport(0, 0, 512, 512);
    return {c:canvas, g:gl};
}

function initStars() {
    with(stars.g) {
        // Create vertex buffer (2 triangles)
        var buffer = createBuffer();
        bindBuffer(ARRAY_BUFFER, buffer);

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
        bufferData(ARRAY_BUFFER, new Float32Array(points), STATIC_DRAW);

        for (var i = 0; i < lines.length; ++i) {
            var x = Math.random() * 2 - 1;
            var y = Math.random() * 2 - 1;
            var z = Math.random() * 2 - 1;
            var w = Math.random() * 2 - 1;
            quats.push({x:x,y:y,z:z,w:w});

            lineTexs.push(renderText(stars.g, lines[i]));
        }

        enable(BLEND);
        blendFunc(SRC_ALPHA, ONE);
    }
}

function renderText(gl, text) {
    var texCanvas = create('canvas');
    texCanvas.width = 256;
    texCanvas.height = 256;

    var ctx = texCanvas.getContext('2d');
    ctx.font = "36px monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    var lines = text.split('\n');
    var lineHeight = 40;
    var topY = (256 - lineHeight * (lines.length - 1)) / 2;
    for (var i = 0; i < lines.length; ++i) {
        ctx.fillText(lines[i], 128,  topY + lineHeight * i);
    }

    return makeTexture(gl, texCanvas);
}

function updateTexture(gl, texName, img) {
    with (gl) {
        bindTexture(TEXTURE_2D, texName);
        pixelStorei(UNPACK_FLIP_Y_WEBGL, true);
        texImage2D(TEXTURE_2D, 0, RGBA, RGBA, UNSIGNED_BYTE, img);
    }
}

function makeTexture(gl, img) {
    var texName;

    with(gl) {
        texName = createTexture();
        updateTexture(gl, texName, img);

        texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, LINEAR);
        texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, LINEAR);

        texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
        texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, CLAMP_TO_EDGE);

        bindTexture(TEXTURE_2D, null);
    }

    return texName;
}

function onWindowResize() {
    var size = window.innerHeight;
    with (filter.c.style) {
        width = height = size + 'px';
        display = 'block';
        margin = 'auto';
    }
}

function compileProg(gl, vertex, fragment) {
    with (gl) {
        var program = createProgram();

        function createShader_(src, type) {
            var shader = createShader(type);
            shaderSource(shader, src);
            compileShader(shader);
            return shader;
        }

        var vs = createShader_(vertex, VERTEX_SHADER);
        var fs = createShader_(fragment, FRAGMENT_SHADER);

        attachShader(program, vs);
        attachShader(program, fs);

        deleteShader(vs);
        deleteShader(fs);

        linkProgram(program);

        return program;
    }
}

function animate() {
    renderStars(Date.now() - startTime);
    renderFilter();
    requestAnimationFrame(animate);
}

function glPrepare(gl, program) {
    with (gl) {
        // Use our shader program
        var vertAttr = getAttribLocation(program, "position");
        enableVertexAttribArray(vertAttr);
        useProgram(program);
        clear( COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT );

        vertexAttribPointer(vertAttr, 3, FLOAT, false, 0, 0);
    }
}

function renderStars(delta) {
    var program = starShader;
    with (stars.g) {
        var base = Math.floor(delta / 3000) + numLines - 1;
        useProgram(program);

        function handle(uniform, idx) {
            activeTexture(TEXTURE0 + idx);
            bindTexture(TEXTURE_2D, lineTexs[(base + idx) % numLines]);
            uniform1i(getUniformLocation(program, "samp" + uniform), idx);

            var q = quats[(base + idx) % numLines];
            uniform4f(getUniformLocation(program, "rotate" + uniform), q.x, q.y, q.z, q.w);
        }

        "Old,From,To,New".split(',').map(handle);
        var burstness = (base - burstIndex + 2 + numLines) % numLines;
        uniform1i(getUniformLocation(program, "burstness"), burstness);

        uniform3f(getUniformLocation(program, 'iResolution'), stars.c.width, stars.c.height, 0);
        uniform1f(getUniformLocation(program, 'interp'), delta / 1500 % 2);

        glPrepare(stars.g, program);
        drawArrays(POINTS, 0, NUM_POINTS);
    }
}


function initFilter() {
    with (filter.g) {
        var buffer = createBuffer();
        bindBuffer( ARRAY_BUFFER, buffer );
        var points = [-1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, 1,1,0, -1,1,0];
        bufferData( ARRAY_BUFFER, new Float32Array(points), STATIC_DRAW );
    }
}

function renderFilter() {
    updateTexture(filter.g, filterTexName, stars.c);
    var program = filterShader;
    with (filter.g) {
        useProgram(program);
        activeTexture(TEXTURE0);
        bindTexture(TEXTURE_2D, filterTexName);
        uniform1i(getUniformLocation(program, "iChannel0"), 0);
        uniform3f(getUniformLocation(program, 'iResolution'), filter.c.width, filter.c.height, 0);
        glPrepare(filter.g, program);
        drawArrays(TRIANGLES, 0, 6);
    }
}

var stars = makeContext(0);
var starShader =
    compileProg(stars.g, getAsset('shaders/stars.vert'), getAsset('shaders/stars.frag'));

var filter = makeContext(1);
var filterTexName = makeTexture(filter.g, stars.c);
var filterShader =
    compileProg(filter.g, getAsset('shaders/demo.vert'), getAsset('shaders/filter.frag'));

var startTime = Date.now();

initStars(stars.g);
initFilter(filter.g);

onWindowResize();
window.addEventListener('resize', onWindowResize, false);
animate();

var img = document.createElement('img');
img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(getAsset('img/yelp.svg')));
img.style.display = 'none';
img.onload = function() { lineTexs[burstIndex] = makeTexture(stars.g, img); };

document.body.style.backgroundColor = '#000';

})();
