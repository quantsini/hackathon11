#ifdef GL_ES
precision mediump float;
#endif


attribute vec3 position;

varying vec4 projOld;
varying vec4 projFrom;
varying vec4 projTo;
varying vec4 projNew;

varying vec4 projCur;

uniform vec4 rotateOld;
uniform vec4 rotateFrom;
uniform vec4 rotateTo;
uniform vec4 rotateNew;

uniform float interp;

// Set up the projection matrix
const float n = 0.1;
const float f = 2.0;
const float t = 0.06;
const float r = 0.06;
const mat4 projection = mat4(
    n/r, 0, 0, 0,
    0, n/t, 0, 0,
    0, 0, -(f+n)/(f-n), -1,
    0, 0, -2.0*f*n/(f-n), 0
);

const mat4 translation = mat4(0.5,0,0,0, 0,0.5,0,0, 0,0,0.5,0, 0,0,-1,1);


mat4 quatRotation(vec4 q) {
    float x2 = 2.0*q.x*q.x, y2 = 2.0*q.y*q.y, z2 = 2.0*q.z*q.z;
    float xy = 2.0*q.x*q.y, yz = 2.0*q.y*q.z, xz = 2.0*q.x*q.z;
    float xw = 2.0*q.x*q.w, yw = 2.0*q.y*q.w, zw = 2.0*q.z*q.w;

    return mat4(
        1.0 - y2 - z2,  xy - zw,        xz + yw,        0,
        xy + zw,        1.0 - x2 - z2,  yz - xw,        0,
        xz - yw,        yz + xw,        1.0 - x2 - y2,  0,
        0,              0,              0,              1
    );
}

vec4 quatConj(vec4 q) {
    return vec4(-q.xyz, q.w);
}

// quatLength = length
// quatNormalize = normalize

vec4 quatInverse(vec4 q) {
    return quatConj(q) / dot(q,q);
}

vec4 project(vec4 q, vec4 pos) {
    return projection * translation * quatRotation(normalize(q)) * pos;
}

void main() {
    float interp2 = smoothstep(0.0,1.0,interp);
    vec4 rotateCur = (1.0 - interp2) * rotateFrom + interp2 * rotateTo;
    vec4 pos = vec4(position.xyz, 1.0);

    projOld = project(rotateOld, pos);
    projFrom = project(rotateFrom, pos);
    projTo = project(rotateTo, pos);
    projNew = project(rotateNew, pos);
    projCur = project(rotateCur, pos);

    gl_Position = projCur;
    gl_PointSize = 6.0;
}
