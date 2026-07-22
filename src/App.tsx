import React from 'react';
import { CanvasRoot } from './canvas/CanvasRoot';
import { OverlayRoot } from './ui/OverlayRoot';

export const App: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CanvasRoot />
      <OverlayRoot />
    </div>
  );
};
export default App;
