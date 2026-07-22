import React from 'react';
import { Controls } from './Controls';

export const OverlayRoot: React.FC = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      <div style={{ pointerEvents: 'auto' }}>
        <Controls />
      </div>
    </div>
  );
};
