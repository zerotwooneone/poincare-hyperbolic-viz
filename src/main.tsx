import React from 'react';
import ReactDOM from 'react-dom/client';
import { CanvasRoot } from './canvas/CanvasRoot';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CanvasRoot />
  </React.StrictMode>
);
