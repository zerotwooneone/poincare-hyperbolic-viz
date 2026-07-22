import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { DiskBackground } from './scene/DiskBackground';
import { ExplorerMesh } from './actors/ExplorerMesh';
import { EventHorizon } from './scene/EventHorizon';

export const CanvasRoot: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#020205' }}>
      <Canvas camera={{ position: [0, -1.2, 1.2], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 2]} intensity={2} color="#4400ff" />
        
        <Suspense fallback={null}>
          <DiskBackground />
          <ExplorerMesh trackId="actor_1" color="#00ffff" />
          <ExplorerMesh trackId="actor_2" color="#ff00aa" />
          <ExplorerMesh trackId="actor_3" color="#aaff00" />
          <EventHorizon />
        </Suspense>

        <OrbitControls 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2.1} 
          minPolarAngle={0} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />

        {/* 
          Increased luminanceThreshold to 0.85. 
          Now, only the high-intensity wireframe and emissive explorer will glow.
        */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.85} mipmapBlur intensity={2.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
