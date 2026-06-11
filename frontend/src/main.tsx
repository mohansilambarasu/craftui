import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!;

root.innerHTML = `
  <div id="app-loader" style="
    position: fixed;
    inset: 0;
    background: #EEE0CC;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    z-index: 9999;
  ">
    <div style="
      width: 40px;
      height: 40px;
      background: #607456;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      animation: pulse 1.5s ease-in-out infinite;
    ">✦</div>
    <p style="
      font-family: Inter, system-ui, sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: rgba(42,31,31,0.4);
      letter-spacing: 0.5px;
    ">Loading CompKraftUI...</p>
    <style>
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(0.9); opacity: 0.6; }
      }
    </style>
  </div>
`;

setTimeout(() => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.style.transition = 'opacity 0.4s ease';
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 400);
  }
  createRoot(root).render(<App />);
}, 800);
