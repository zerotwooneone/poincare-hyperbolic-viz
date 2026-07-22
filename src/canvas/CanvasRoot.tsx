import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DiskBackground } from './scene/DiskBackground';
import { ExplorerMesh } from './actors/ExplorerMesh';

export const CanvasRoot: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050508' }}>
      <Canvas camera={{ position: [0, 0, 1.8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <DiskBackground />
          <ExplorerMesh />
        </Suspense>
        <OrbitControls 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2.5} 
          minPolarAngle={0} 
          autoRotate 
          autoRotateSpeed={0.3} 
        />
      </Canvas>
    </div>
  );
};
