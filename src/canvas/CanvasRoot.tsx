import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export const CanvasRoot: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050508' }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          {/* Geometries & Actors will be injected here */}
        </Suspense>
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>
    </div>
  );
};
