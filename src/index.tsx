import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
const rootElement = createRoot(document.getElementById('root') as HTMLElement);

rootElement.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
);