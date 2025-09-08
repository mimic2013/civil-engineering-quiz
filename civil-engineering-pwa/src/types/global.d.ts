// Service Worker类型扩展
interface ServiceWorkerRegistration {
  installing: ServiceWorker | null;
  waiting: ServiceWorker | null;
  active: ServiceWorker | null;
}

interface ServiceWorker extends EventTarget {
  state: string;
}

interface Navigator {
  serviceWorker: ServiceWorkerContainer;
}

interface Window {
  __WB_MANIFEST: Array<string>;
}