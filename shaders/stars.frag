#ifdef GL_ES
precision mediump float;
#endif

uniform float iGlobalTime; // shader playback time (in seconds)
uniform vec3 iResolution;

varying vec4 projOld;
varying vec4 projFrom;
varying vec4 projTo;
varying vec4 projNew;

varying vec4 projCur;

uniform sampler2D sampOld;
uniform sampler2D sampFrom;
uniform sampler2D sampTo;
uniform sampler2D sampNew;

uniform float interp;

uniform int burstness;

vec2 toUV(vec4 pos) {
    return pos.xy / vec2(pos.w * 2.0) + vec2(0.5);
}

float alpha(sampler2D samp, vec4 pos, float off) {
    return texture2D(samp, toUV(pos)).a > 0.1 ? off : 1.0;
}

void main(void) {
    float interp2 = smoothstep(0.0,1.0,interp);

    float alphaOld = alpha(sampOld, projOld, interp2);
    float alphaFrom = alpha(sampFrom, projFrom, 0.0);
    float alphaTo = alpha(sampTo, projTo, 0.0);
    float alphaNew = alpha(sampNew, projNew, 1.0 - interp2);

    float redness = 0.0;
    float greyness = 0.0;
    if (burstness == 0) {
        greyness = interp2;
        redness = interp2 * (1.0 - alphaTo);
        //alphaTo *= 1.0 - interp2;
    } else if (burstness == 1) {
        greyness = 1.0 - interp2;
        redness = (1.0 - interp2) * (1.0 - alphaFrom);
        //alphaFrom *= interp2;
    }

    vec2 uvCur = toUV(projCur);
    vec2 uvScreen = gl_FragCoord.xy / iResolution.xy;
    float dist = length(uvScreen - uvCur);
    float maxDist = length(vec2(5) / iResolution.xy);

    float c = min(min(alphaOld, alphaNew), min(alphaFrom, alphaTo));
    c = max(redness, c * (1.0 - greyness * 0.5));
    float d = 1.0 - dist / maxDist;
    //gl_FragColor = vec4(c * d * d);
    float a = c * d * d;

    vec3 color = vec3(0.749, 0.145, 0.098) * vec3(redness) + vec3(1.0 - redness);

    gl_FragColor = vec4(color * vec3(a), a);
}
