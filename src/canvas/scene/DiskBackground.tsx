import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useLatticeData } from '../../hooks/useLatticeData';
import vertexShader from '../shaders/disk.vert?raw';
import fragmentShader from '../shaders/disk.frag?raw';

export const DiskBackground: React.FC = () => {
  const data = useLatticeData();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
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
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  if (!geometry) return null;

  return (
    <group>
      {/* Base plane: Darkened and returned to normal blending */}
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ uColorLUT: { value: lutTexture }, uTime: { value: 0 } }}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false} // Keeps the Z-fighting away without blowing out the colors
          opacity={0.6} // Darken the base so the wireframe pops
        />
      </mesh>
      
      {/* The Non-Euclidean Lattice: Increased opacity and intensity */}
      <mesh geometry={geometry}>
        <meshBasicMaterial 
          color="#d400ff" // Brighter pink/purple
          wireframe 
          transparent 
          opacity={0.7} // Significantly more visible
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
