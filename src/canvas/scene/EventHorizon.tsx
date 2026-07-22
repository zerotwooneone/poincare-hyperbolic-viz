import React, { useRef } from 'react';
import * as THREE from 'three';

const eventHorizonFragmentShader = `
varying vec2 vUv;

void main() {
    // Center the UV coordinates (-1.0 to 1.0)
    vec2 pos = vUv * 2.0 - 1.0;
    float r = length(pos);
    
    // Smoothly fade in a deep purple glow starting at r = 0.6 and peaking at r = 1.0
    float alpha = smoothstep(0.6, 1.0, r);
    
    // Hard clip anything strictly outside the mathematical universe
    if (r > 1.0) discard;
    
    // Deep, dark space magenta/purple
    vec3 color = vec3(0.15, 0.0, 0.25); 
    
    gl_FragColor = vec4(color, alpha * 0.9);
}
`;

const eventHorizonVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const EventHorizon: React.FC = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    return (
        <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.05, 2.05]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={eventHorizonVertexShader}
                fragmentShader={eventHorizonFragmentShader}
                transparent={true}
                depthWrite={false}
                side={THREE.DoubleSide} // <-- Added this line to render both faces
            />
        </mesh>
    );
};