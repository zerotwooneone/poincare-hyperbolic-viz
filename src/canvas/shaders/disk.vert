uniform float uTime;
varying vec2 vUv;
varying float vRadius; // <-- Re-added to satisfy disk.frag

// Complex Number Multiplication: (a+bi) * (c+di)
vec2 cMul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

// Complex Number Division: (a+bi) / (c+di)
vec2 cDiv(vec2 a, vec2 b) {
    float denominator = dot(b, b);
    return vec2(dot(a, b), a.y * b.x - a.x * b.y) / denominator;
}

// Complex Conjugate
vec2 cConj(vec2 a) {
    return vec2(a.x, -a.y);
}

void main() {
    vUv = uv;
    vec2 z = position.xy;

    // Create a time-based panning offset 'a' inside the unit disk
    float panSpeed = uTime * 0.2;
    vec2 a = vec2(sin(panSpeed) * 0.4, cos(panSpeed * 0.5) * 0.2); 

    // Compute numerator: z - a
    vec2 num = z - a;
    
    // Compute denominator: 1 - conj(a)*z
    vec2 one = vec2(1.0, 0.0);
    vec2 aConj_z = cMul(cConj(a), z);
    vec2 den = one - aConj_z;

    // Final Transformation: w = (z - a) / (1 - conj(a)*z)
    vec2 w = cDiv(num, den);

    // Calculate the new radius based on the transformed coordinate for the fragment shader
    vRadius = length(w);

    // Reconstruct position
    vec3 transformedPos = vec3(w.x, w.y, position.z);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0);
}