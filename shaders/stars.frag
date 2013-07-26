#ifdef GL_ES
precision mediump float;
#endif

uniform float iGlobalTime; // shader playback time (in seconds)
uniform vec3 iResolution;

vec4 cStar = vec4(0.875, 0.329, 0.282, 1);
vec4 cBg = vec4(0.76,0.07,0,1);
float triSize = 0.07;
float triRatioHeightToBase = 1.;
float xMod = 0.4;
float yMod = 0.3;
float xModOffset = 0.1;
float animParam1 = 0.1;
float animParam2 = 0.03;

float aa(float v){return smoothstep(1.5/iResolution.y,0.0,v);}

vec2 rotate(vec2 p, float a) {
    return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

float tri(vec2 p)
{
	return max(abs(p.x)*triRatioHeightToBase+p.y*0.5,-p.y) - triSize*0.5;
}

void main(void) {
     vec2 uv = gl_FragCoord.xy / iResolution.y;
    float ratio = iResolution.x / iResolution.y;
    uv.x -= 0.5 * ratio;
    uv.x += animParam1 * iGlobalTime;
    uv.y -= 0.5;
    
    float v = 100.0;
    for(float a=0.0; a<6.2; a+=1.256637)
    {
	float xOffset = floor(uv.y / yMod) * (xModOffset + animParam2 * iGlobalTime);
	      vec2 p = vec2(mod(uv.x + xOffset, xMod) - xMod * 0.5, mod(uv.y, yMod) - yMod * 0.5);
	      	   v = min(v, tri(vec2(0.,-.5*triSize) + rotate(p, a)));
		   }

		   vec4 col = mix(cBg, cStar, aa(v));
		   gl_FragColor = col;
}
