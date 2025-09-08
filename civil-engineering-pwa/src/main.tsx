import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 注册Service Worker
if ('serviceWorker' in navigator) {
  // 等待页面加载完成
  window.addEventListener('load', () => {
    // 注册Service Worker
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker注册成功: ', registration);
        
        // 检查更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            console.log('发现Service Worker更新:', newWorker);
            
            newWorker.addEventListener('statechange', () => {
              console.log('Service Worker状态变更:', newWorker.state);
            });
          }
        });
      })
      .catch((error) => {
        console.log('Service Worker注册失败: ', error);
      });
    
    // 检查控制器更新
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Controller changed');
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)