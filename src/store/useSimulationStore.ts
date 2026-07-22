import { create } from 'zustand';

interface SimulationState {
  isPlaying: boolean;
  speed: number;
  activeTheme: 'cyberpunk' | 'plasma' | 'monochrome';
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
  setTheme: (theme: 'cyberpunk' | 'plasma' | 'monochrome') => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isPlaying: true,
  speed: 1.0,
  activeTheme: 'cyberpunk',
  setPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setTheme: (activeTheme) => set({ activeTheme }),
}));
