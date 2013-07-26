#ifdef GL_ES
precision mediump float;
#endif

uniform float iGlobalTime; // shader playback time (in seconds)
uniform vec3 iResolution;

#define rS 1.25663706144
vec4 cS = vec4(1,1,1,1);
vec4 cY = vec4(0,0,0,1);
vec4 cB = vec4(0.76,0.07,0,1);
float sW = 0.05;
float lw = 0.03;
vec2 r(vec2 p, float a) {
    return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}
float lspd(vec2 v, vec2 w, vec2 p) {
    float l2=length(w-v)*length(w-v);
    if (l2==0.0) return distance(p,v);
    float t=dot(p-v,w-v)/l2;
    if (t<0.0) return distance(p,v);
    else if (t>1.0) return distance(p,w);
    return distance(p, v+t*(w-v));
}

float burstn(vec2 p) {
    float u;
    p.x += 0.11;
    u = lspd(vec2(0.03,0),vec2(-0.08,-0.03),p)-0.02;
    u = min(u,lspd(vec2(0.03,0),vec2(-0.08,0.03),p)-0.02);
    u = min(u,lspd(vec2(-0.04,0),vec2(-0.5,0),p)-0.01);
    u = min(u,lspd(vec2(-0.082,-0.03),vec2(-0.082,0.03),p)-0.02);
    u = max(u,length(vec2(0.07,0)-p)-0.172);
    return u;
}

float burstb(vec2 p) {
    float u;
    p.x += 0.11;
    u = lspd(vec2(0.03,0),vec2(-0.24,-0.06),p)-0.02;
    u = min(u,lspd(vec2(0.03,0),vec2(-0.24,0.06),p)-0.02);
    u = min(u,lspd(vec2(-0.08,0),vec2(-0.42,0.04),p)-0.03);
    u = min(u,lspd(vec2(-0.08,0),vec2(-0.42,-0.04),p)-0.03);
    u = max(u,length(vec2(0.07,0)-p)-0.33);
    return u;
}

float lettery(vec2 p) {
    float u;
    u = lspd(vec2(-0.205,0.41),vec2(-0.105,0.205),p)-lw;
    u = min(u,lspd(vec2(-0.035,0.41),vec2(-0.105,0.205),p)-lw);
    u = min(u,lspd(vec2(-0.105,0.205),vec2(-0.113,0.151),p)-lw);
    u = min(u,lspd(vec2(-0.113,0.151),vec2(-0.125,0.135),p)-lw);
    u = min(u,lspd(vec2(-0.134,0.128),vec2(-0.125,0.135),p)-lw);
    u = min(u,lspd(vec2(-0.145,0.119),vec2(-0.134,0.128),p)-lw);
    u = min(u,lspd(vec2(-0.175,0.119),vec2(-0.145,0.119),p)-lw);
    return u;
}
float lettere(vec2 p) {
    float u,v,w;
    u = lspd(vec2(0.066,0.31),vec2(0.258,0.31),p)-lw*0.8;
    u = min(u,lspd(vec2(0.204,0.225),vec2(0.22,0.237),p)-lw*0.86);
    v = length(vec2(0.1625,0.31)-p)-0.12;
    v = max(v,-length(vec2(0.1625,0.31)-p)+0.07);
    v = max(v,-(p.y-0.31));
    w = length(vec2(0.1625,0.31)-p)-0.12;
    w = max(w,-length(vec2(0.1625,0.31)-p)+0.07);
    w = max(w,(p.y-0.31));
    w = max(w,(p.x-0.21));
    return min(min(u,v),w);
}
float letterl(vec2 p) {
    return lspd(vec2(0.377,0.51),vec2(0.377,0.205),p)-lw;
}
float letterp(vec2 p) {
    float u;
    u = lspd(vec2(0.52,0.11),vec2(0.52,0.43),p)-lw;
    u = min(u,lspd(vec2(0.62,0.37),vec2(0.62,0.27),p)-0.09);
    u = max(u,-lspd(vec2(0.63,0.355),vec2(0.63,0.285),p)+0.05);
    return u;
}
float aa(float v){return smoothstep(1.5/iResolution.y,0.0,v);}
void yelp(inout vec4 col, vec2 uv) {
    float y,e,l,p,v;
    vec2 center = vec2(1.00, 0.37);
    float T = iGlobalTime*2.0;
    float init = 1.3 +  0.5 * sin(T);
    y = lettery(uv-vec2(0,0.2*max(0.0,sin(T))));
    e = lettere(uv-vec2(0,0.2*max(0.0,sin(T+0.4))));
    l = letterl(uv-vec2(0,0.2*max(0.0,sin(T+0.7))));
    p = letterp(uv-vec2(0,0.2*max(0.0,sin(T+1.3))));
    v = burstb(r(uv-center,init));
    for(int i=1; i<=4; i++) {
        v = min(v, burstn(r(uv-center, rS*float(i)+init)));
    }
    col = mix(col, cS, aa(y - sW));
    col = mix(col, cS, aa(e - sW));
    col = mix(col, cS, aa(l - sW));
    col = mix(col, cS, aa(p - sW));
    col = mix(col, cS, aa(v - sW));
    col = mix(col, cS, aa(length(uv-center)-0.1));
    col = mix(col, cY, aa(y));
    col = mix(col, cY, aa(e));
    col = mix(col, cY, aa(l));
    col = mix(col, cY, aa(p));
    col = mix(col, cB, aa(v));
}
void main(void) {
    vec2 uv = gl_FragCoord.xy / iResolution.y;
    float ratio = iResolution.x / iResolution.y;
    uv.x += 0.5 - ratio / 2.0;
    uv.y -= 0.07;
    vec4 col = vec4(0.0,0.0,0.0,0.0);
    yelp(col, uv);
    gl_FragColor = col;
}
