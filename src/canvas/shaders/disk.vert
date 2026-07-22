varying vec2 vUv;
varying float vRadius;

void main() {
  vUv = uv;
  // Compute distance from center of the disk to use for color lookup
  vRadius = length(position.xy);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
