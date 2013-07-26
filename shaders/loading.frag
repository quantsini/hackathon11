#ifdef GL_ES
precision mediump float;
#endif

uniform float iGlobalTime; // shader playback time (in seconds)
uniform vec3 iResolution;

void main(void)
{
	vec3 col = vec3(0.,0.,0.);
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	if( (abs(uv.y - 0.5) < 0.1) && (uv.x < iGlobalTime))
	{
		col = vec3(uv,0.5+0.5*sin(iGlobalTime));
	}
	gl_FragColor = vec4(col, 1.0);
}
