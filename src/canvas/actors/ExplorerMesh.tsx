import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useBakedPaths } from '../../hooks/useBakedPaths';
import { useSimulationStore } from '../../store/useSimulationStore';

interface ExplorerProps {
  trackId: string;
  color: string;
}

export const ExplorerMesh: React.FC<ExplorerProps> = ({ trackId, color }) => {
  const tracks = useBakedPaths();
  const actorRef = useRef<THREE.Mesh>(null);
  const frameCounter = useRef(Math.random() * 100); // Offset start times

  const { isPlaying, speed } = useSimulationStore();

  useFrame(() => {
    if (!tracks || !actorRef.current || !isPlaying) return;

    const track = tracks[trackId];
    if (!track) return;

    const currentIdx = Math.floor(frameCounter.current) % track.length;
    const frameData = track[currentIdx];

    const s = frameData.scale * 0.08;
    actorRef.current.scale.set(s, s, s);
    actorRef.current.position.set(frameData.x, frameData.y, s);

    actorRef.current.rotation.x += 0.02 * speed;
    actorRef.current.rotation.y += 0.03 * speed;

    frameCounter.current += speed;
  });

  return (
    <Trail
      width={0.5}
      color={color}
      length={40}
      decay={1.5}
      attenuation={(t) => t * t}
    >
      {/* Set initial scale to 0 to prevent the massive default geometry */}
      <mesh ref={actorRef} scale={0}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={3} color="#001111" roughness={0.2} />
      </mesh>
    </Trail>
  );
};