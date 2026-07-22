uniform sampler2D uColorLUT;
uniform float uTime;
varying vec2 vUv;
varying float vRadius;

void main() {
  // Sample color from our pre-generated gradient based on distance from origin
  vec3 color = texture2D(uColorLUT, vec2(vRadius, 0.5)).rgb;
  
  // Add a subtle wave animation pulse through space
  float pulse = sin(vRadius * 20.0 - uTime * 2.0) * 0.05;
  color += vec3(pulse * 0.5, 0.0, pulse);
  
  // Soft alpha drop-off at the absolute edge of infinity (radius = 1.0)
  float alpha = smoothstep(1.0, 0.95, vRadius);
  
  gl_FragColor = vec4(color, alpha);
}
