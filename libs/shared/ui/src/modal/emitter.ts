/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

type Callback<T> = (value: T) => void;

export class Emitter {
  static readonly eventCallbacks = new Map<string, Set<Callback<any>>>();

  static on<T>(event: string, callback: Callback<T>) {
    if (!this.eventCallbacks.has(event)) {
      this.eventCallbacks.set(event, new Set());
    }

    this.eventCallbacks.get(event)?.add(callback);
  }

  static rm<T>(event: string, callback: Callback<T>) {
    if (!this.eventCallbacks.has(event)) {
      return;
    }

    this.eventCallbacks.get(event)?.delete(callback);
  }

  static rmAll(event: string) {
    this.eventCallbacks.get(event)?.clear();
  }

  static clear() {
    this.eventCallbacks.clear();
  }

  static emit<T>(event: string, value?: T) {
    const callbacks = this.eventCallbacks.get(event);

    if (callbacks) {
      for (const callback of callbacks) callback(value);
    }
  }
}
