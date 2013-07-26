#ifdef GL_ES
precision mediump float;
#endif

uniform float iGlobalTime; // shader playback time (in seconds)
uniform vec3 iResolution;

// cos(pi / 10)
#define dplimit 0.95105651629

// sin(pi / 10)
#define sinlimit 0.30901699437

// 2pi / 5
#define rotateStep 1.25663706144

// 2pi / 5
#define rotateInit -0.25

// controls smoothing of inner corner
#define smallr 0.03

vec3 cWhite = vec3(1,1,1);
vec3 cBlack = vec3(0,0,0);
vec3 cGrey = vec3(0.772, 0.772, 0.772);
float strokeW = 0.05;

vec2 rotate(vec2 p, float a) {
    return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

float segment(vec2 pp, vec2 center, vec2 outer) {
    vec2 c_p = pp - center; // center to pixel point
    vec2 c_o = outer - center; // center to outer
    vec2 norm_c_o = normalize(c_o);
    vec2 norm_c_p = normalize(c_p);

    // This section defines a segement of a circle
    float dp = dot(norm_c_p, norm_c_o); // dot product normalized vectors
    float w = dplimit - dp; // place limit on how much dot product can move away from 1.0
    float ww = length(c_p) - length(c_o);
    
    // This section deals with smoothing the inner point
    vec2 smallcirccenter = center + ((smallr / sinlimit) * norm_c_o);
    float www = length(pp - smallcirccenter) - smallr;
    float wwww = min(dot(smallcirccenter-pp, c_o), www);
    
    // This section deals with smoothing the outer points
    vec2 sidevec = c_p - (dot(c_p, norm_c_o) * norm_c_o);
    float wwwww = dot(c_p,c_p) + dot(sidevec,sidevec) - (1.01 * dot(c_o, c_o));
    
    return max(max(max(w, ww), wwww), wwwww);
}

float aa(float v){return smoothstep(1.5/iResolution.y,0.0,v);}

void burst(inout vec3 col, vec2 uv, vec3 burstCol, vec2 center, float scale, float inwards, float rotateStart) {
    vec2 largeRadius = scale * vec2(0.0, -0.5);
    vec2 smallRadius = scale * vec2(0.0, -0.33);
    vec2 vInwards = -inwards * smallRadius;
    float v = segment(uv, center + rotate(vInwards, rotateStart), center + rotate(largeRadius, rotateStart));
    for(int i=1; i<=4; i++)
    {
        v = min(v, segment(uv, center + rotate(vInwards, rotateStart + rotateStep*float(i)), center + rotate(smallRadius, rotateStart + rotateStep*float(i))));
    }
    col = mix(col, burstCol, aa(v));
}

void main(void) {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;
    uv *= 1.1;
    uv.y *= -1.0;
    uv.x += -0.2;
    uv.y += 1.05;

    vec3 origCol = mix(vec3(0.391,0.07,0.0), vec3(0.844,0.07,0.0), 1.0 - uv.y);
    vec3 col = origCol;
    vec2 center = vec2(0.8, 0.6);
    vec2 offset = vec2(0.02, -0.02);
    float rotateStart = rotateInit + 0.5 * sin(iGlobalTime);
    burst(col, uv, cWhite, center+.3*offset, 1.15, 0.5, rotateStart);
    burst(col, uv, cGrey, center, 1.0, 0.0, rotateStart);
    burst(col, uv, origCol, center+1.*offset, 1.0, 0.0, rotateStart);
    gl_FragColor = vec4(col, 1.0);
}
