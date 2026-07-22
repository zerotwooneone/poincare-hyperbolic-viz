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
      {/* Base colored glowing plane */}
      <mesh geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ uColorLUT: { value: lutTexture }, uTime: { value: 0 } }}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending} // Fixes the pink static Z-fighting!
        />
      </mesh>
      
      {/* Cyberpunk neon wireframe overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial 
          color="#aa00ff" 
          wireframe 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
};
