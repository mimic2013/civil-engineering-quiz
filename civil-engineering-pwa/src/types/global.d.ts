// Service Worker 和 PWA 相关类型定义
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

// BeforeInstallPromptEvent 类型定义
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// 扩展 WindowEventMap
interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent;
  appinstalled: Event;
}