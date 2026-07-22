import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBakedPaths } from '../../hooks/useBakedPaths';
import { useSimulationStore } from '../../store/useSimulationStore';

export const ExplorerMesh: React.FC = () => {
  const tracks = useBakedPaths();
  const actorRef = useRef<THREE.Mesh>(null);
  const frameCounter = useRef(0);
  
  const { isPlaying, speed } = useSimulationStore();

  useFrame(() => {
    if (!tracks || !actorRef.current || !isPlaying) return;

    // Fast tracking lookup using integers to avoid React state re-renders
    const track = tracks.actor_1;
    const currentIdx = Math.floor(frameCounter.current) % track.length;
    const frameData = track[currentIdx];

    // Map 2D non-Euclidean coordinates to 3D space positions
    actorRef.current.position.set(frameData.x, frameData.y, 0.02);
    
    // Crucial step: scale down as the object approaches the edge of infinity
    const s = frameData.scale * 0.08;
    actorRef.current.scale.set(s, s, s);

    // Update frame position based on custom global velocity speeds
    frameCounter.current += speed;
  });

  return (
    <mesh ref={actorRef}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} color="#00ffff" roughness={0.1} />
    </mesh>
  );
};
