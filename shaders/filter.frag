#ifdef GL_ES
precision mediump float;
#endif

#define KERNEL_SIZE 3

uniform sampler2D iChannel0;
uniform vec3 iResolution;

float kernel[KERNEL_SIZE * KERNEL_SIZE];

//	float[](0.05, 0.09, 0.12, 0.15, 0.16, 0.15, 0.12, 0.09, 0.05);

float blurSize = 7.0;

vec4 passThru(vec2 uv) {
	return texture2D(iChannel0, uv);
}

/*
void main(void)
{
	
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	gl_FragColor = 1.0-(1.0-((1.0)*gl_FragColor))*(1.0-((0.5)*gl_FragColor));
	
	//gl_FragColor = passThru(iChannel0, uv);
}
*/

void main(void) {
	
	kernel[0] = 0.05;
kernel[1] = 0.09;
kernel[2] = 0.12;
kernel[3] = 0.15;
kernel[4] = 0.16;
kernel[5] = 0.15;
kernel[6] = 0.12;
kernel[7] = 0.09;
kernel[8] = 0.05;
	
	
	
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	float step_w = 1.0/iResolution.x;
	float step_h = 1.0/iResolution.y;
    int offsetX;
    int offsetY;
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

  	for( int i = 0; i < KERNEL_SIZE; i++ ) {
  		for ( int j = 0; j < KERNEL_SIZE; j++ ) {
  			vec2 offset = blurSize * vec2((float(i) - float(KERNEL_SIZE)/2.0)*1.0/float(iResolution.x), (float(j) - float(KERNEL_SIZE)/2.0)*1.0/float(iResolution.y));
  			color += passThru(uv + offset) * kernel[i + j];
  		}
  	}
   ;
   color.a = 1.0;
	vec4 new_color = 1.0-(1.0-((1.0)*color))*(1.0-((0.5)*color));
	vec4  original = passThru(uv);
	gl_FragColor  = mix(original, new_color, vec4(0.5, 0.5, 0.5, 1));

    //gl_FragColor = texture2D(iChannel0, vec2(gl_FragCoord) / vec2(iResolution));
    //gl_FragColor = vec4(vec2(gl_FragCoord) / vec2(iResolution), 0, 1);
	
	//gl_FragColor = original;
}
