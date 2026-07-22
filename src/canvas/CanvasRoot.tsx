import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { DiskBackground } from './scene/DiskBackground';
import { ExplorerMesh } from './actors/ExplorerMesh';

export const CanvasRoot: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#020205' }}>
      <Canvas camera={{ position: [0, -1.2, 1.2], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 2]} intensity={2} color="#4400ff" />
        
        <Suspense fallback={null}>
          <DiskBackground />
          <ExplorerMesh />
        </Suspense>

        <OrbitControls 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2.1} 
          minPolarAngle={0} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />

        {/* The Cyberpunk Glow Engine */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
