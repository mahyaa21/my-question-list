export class ServerSideStorage {
  storage: Map<string, string> = new Map<string, string>();

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.get(key) || null;
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  key(): string | null {
    return null;
  }
}

export default ServerSideStorage;
