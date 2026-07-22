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

    const track = tracks.actor_1;
    const currentIdx = Math.floor(frameCounter.current) % track.length;
    const frameData = track[currentIdx];

    const s = frameData.scale * 0.08;
    actorRef.current.scale.set(s, s, s);
    
    // Set Z exactly to 's' so the bottom point of the diamond perfectly touches the floor
    actorRef.current.position.set(frameData.x, frameData.y, s);
    
    // Tumble the geometry dynamically
    actorRef.current.rotation.x += 0.02 * speed;
    actorRef.current.rotation.y += 0.03 * speed;

    frameCounter.current += speed;
  });

  return (
    <mesh ref={actorRef}>
      <octahedronGeometry args={[1, 0]} />
      {/* Darken the base color so the emissive glow takes over */}
      <meshStandardMaterial emissive="#00ffff" emissiveIntensity={3} color="#004444" roughness={0.2} />
    </mesh>
  );
};
