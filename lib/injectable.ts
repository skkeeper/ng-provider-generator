import { Class } from './globals';
import { InjectableStorage } from './injectable-storage';


export function Injectable(config: { provide: Class | string, environmentKey: any }) {
  return (constructor: Function) => {
    const storage = InjectableStorage.getInstance();
    storage.save(config.provide, config.environmentKey,<Class> constructor);
  }
}

