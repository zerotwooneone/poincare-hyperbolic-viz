import { useEffect, useState } from 'react';

export interface PathFrame {
  x: number;
  y: number;
  scale: number;
}

// Use a Record to allow dynamic keys (actor_1, actor_2, etc.)
export type TrackData = Record<string, PathFrame[]>;

export const useBakedPaths = () => {
  const [tracks, setTracks] = useState<TrackData | null>(null);

  useEffect(() => {
    // Point this to the correct file path you verified earlier
    fetch('/generated/paths.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load paths');
        return res.json();
      })
      .then((json) => setTracks(json))
      .catch((err) => console.error("Error loading tracks:", err));
  }, []);

  return tracks;
};