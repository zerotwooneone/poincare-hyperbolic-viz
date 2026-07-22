import React from 'react';
import { useSimulationStore } from '../store/useSimulationStore';

export const Controls: React.FC = () => {
  const { isPlaying, speed, activeTheme, setPlaying, setSpeed, setTheme } = useSimulationStore();

  return (
    <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'rgba(10,10,12,0.85)', padding: 16, borderRadius: 8, color: '#fff', fontFamily: 'monospace', backdropFilter: 'blur(8px)', border: '1px solid #333', zIndex: 10 }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Hyperbolic Controls</h3>
      <button onClick={() => setPlaying(!isPlaying)} style={{ background: isPlaying ? '#ff0055' : '#00ff66', border: 'none', padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold' }}>
        {isPlaying ? 'PAUSE' : 'PLAY'}
      </button>
      <div style={{ margin: '12px 0' }}>
        <label>Speed: {speed.toFixed(1)}x</label>
        <input type="range" min="0.1" max="3" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} style={{ display: 'block', width: '100%' }} />
      </div>
      <div>
        <select value={activeTheme} onChange={(e) => setTheme(e.target.value as any)} style={{ background: '#222', color: '#fff', padding: 4, width: '100%' }}>
          <option value="cyberpunk">Cyberpunk Neon</option>
          <option value="plasma">Plasma Void</option>
          <option value="monochrome">Monochrome Grid</option>
        </select>
      </div>
    </div>
  );
};
