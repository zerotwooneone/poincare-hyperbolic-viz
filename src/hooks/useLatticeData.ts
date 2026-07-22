import { useEffect, useState } from 'react';

export interface LatticeData {
  vertices: number[];
  indices: number[];
}

export const useLatticeData = () => {
  const [data, setData] = useState<LatticeData | null>(null);

  useEffect(() => {
    fetch('/generated/geometry/lattice.json')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return data;
};
