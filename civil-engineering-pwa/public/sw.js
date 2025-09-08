// 定义缓存名称和要缓存的文件
const CACHE_NAME = 'civil-engineering-quiz-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// 安装Service Worker
self.addEventListener('install', function(event) {
  console.log('Service Worker安装中...');
  
  // 等待直到缓存完成
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('已打开缓存');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求并使用缓存
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 如果缓存中有响应，则返回缓存
        if (response) {
          return response;
        }
        
        // 否则从网络获取
        return fetch(event.request);
      }
    )
  );
});

// 激活Service Worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker激活');
  
  // 删除旧缓存
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});