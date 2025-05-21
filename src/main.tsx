import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Workbox } from 'workbox-window';
import App from './App.tsx';
import './index.css';

const isIOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

if ('serviceWorker' in navigator && !isIOS) {
  const wb = new Workbox('/service-worker.js');
  
  wb.addEventListener('waiting', () => {
    wb.messageSkipWaiting();
    window.location.reload();
  });

  wb.register().catch(console.error);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);