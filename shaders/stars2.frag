#ifdef GL_ES
precision mediump float;
#endif

uniform float iGlobalTime; // shader playback time (in seconds)
uniform vec3 iResolution;

vec4 cStarFront = vec4(0.92, 0.37, 0.31, 1);
vec4 cStarBack = vec4(0.3,0.04,0,1);
vec4 cBg = vec4(0.2,0.2,0.2,1);
float triSize = 0.2;
float triRatioHeightToBase = 1.;
float xMod = 0.8;
float yMod = 0.6;
float xModOffset = 0.4;
float animParam1 = 0.1;

float aa(float v){return smoothstep(1.5/iResolution.y,0.0,v);}

vec2 rotate(vec2 p, float a) {
    return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

float tri(vec2 p)
{
    return max(abs(p.x)*triRatioHeightToBase+p.y*0.5,-p.y) - triSize*0.5;
}

float stars(vec2 uv)
{
	uv.x += animParam1 * iGlobalTime;
    float v = 100.0;
    for(float a=0.0; a<6.2; a+=1.256637)
    {
        float xOffset = floor(uv.y / yMod) * (xModOffset);
        vec2 p = vec2(mod(uv.x + xOffset, xMod) - xMod * 0.5, mod(uv.y, yMod) - yMod * 0.5);
        v = min(v, tri(vec2(0.,-.5*triSize) + rotate(p, a)));
    }
    return v;
}

void layer(vec2 uv, float z, inout vec4 col)
{
	float d = stars(uv + 4. * (0.25 + z) * uv);
	vec4 starCol = mix(cStarFront, cStarBack, 0.25*z);
    col = mix(col, starCol, aa(d));
}

void main(void) {
     vec2 uv = gl_FragCoord.xy / iResolution.y;
    float ratio = iResolution.x / iResolution.y;
    uv.x -= 0.5 * ratio;
    
    uv.y -= 0.5;

    vec4 col = cBg;
    for(float z=3.;z>-.1;z-=1.5)
    {
	layer(uv,z,col);
	}
    gl_FragColor = col;
}
