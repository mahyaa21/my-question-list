import { ServerSideStorage } from './serverSideStorage';

class HybridStorage {
  static Instance: HybridStorage;

  private storage: any;

  constructor() {
    const isServer = typeof window === 'undefined';
    this.storage = isServer ? new ServerSideStorage() : localStorage;
  }

  static getInstance(): HybridStorage {
    if (!HybridStorage.Instance) {
      HybridStorage.Instance = new HybridStorage();
    }
    return HybridStorage.Instance;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}

export const wrappedLocalStorage = HybridStorage.getInstance();

export default HybridStorage;
