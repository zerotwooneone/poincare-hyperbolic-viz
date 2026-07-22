import { useEffect, useState } from 'react';

export interface PathFrame {
  x: number;
  y: number;
  scale: number;
}

export const useBakedPaths = () => {
  const [tracks, setTracks] = useState<{ actor_1: PathFrame[] } | null>(null);

  useEffect(() => {
    fetch('/generated/paths/actor_tracks.json')
      .then((res) => res.json())
      .then((json) => setTracks(json));
  }, []);

  return tracks;
};
