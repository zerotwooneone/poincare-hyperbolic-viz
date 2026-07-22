import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useLatticeData } from '../../hooks/useLatticeData';
import vertexShader from '../shaders/disk.vert?raw';
import fragmentShader from '../shaders/disk.frag?raw';

// A tiny fragment shader just to render the solid neon pink for the wireframe
const wireframeFragmentShader = `
uniform vec3 uColor;
uniform float uOpacity;
void main() {
    gl_FragColor = vec4(uColor, uOpacity);
}
`;

export const DiskBackground: React.FC = () => {
  const data = useLatticeData();
  const baseMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const wireMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const lutTexture = useLoader(THREE.TextureLoader, '/generated/textures/space_gradient.png');

  const geometry = useMemo(() => {
    if (!data) return null;
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(data.vertices, 3));
    geom.setIndex(data.indices);
    geom.computeVertexNormals();
    return geom;
  }, [data]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Update the uTime uniform for BOTH materials so they pan together
    if (baseMaterialRef.current) baseMaterialRef.current.uniforms.uTime.value = t;
    if (wireMaterialRef.current) wireMaterialRef.current.uniforms.uTime.value = t;
  });

  if (!geometry) return null;

  return (
    <group>
      {/* Base plane */}
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={baseMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ uColorLUT: { value: lutTexture }, uTime: { value: 0 } }}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false}
          opacity={0.6}
        />
      </mesh>

      {/* The Non-Euclidean Lattice */}
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={wireMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={wireframeFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#d400ff') },
            uOpacity: { value: 0.7 }
          }}
          wireframe={true}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};