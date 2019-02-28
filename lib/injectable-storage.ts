import { ImplementationsConfigObject, Class } from "./globals";

export class InjectableStorage {
  private static instance: InjectableStorage;

  private storage: Map<any, any> = new Map<any, ImplementationsConfigObject>();

  constructor() {

  }

  public static getInstance() : InjectableStorage {
    return this.instance || (this.instance = new this());
  }

  save(provide: any, environmentKey: any, classToInject: Class) {
    const saved = this.storage.get(provide);
    if (typeof saved === 'undefined') {
      const env: ImplementationsConfigObject = {};
      env[environmentKey] = classToInject
      this.storage.set(provide, env);
    } else {
      saved[environmentKey] = classToInject;
    }
  }

  getConfigObject() {
    return Array.from(this.storage).map((v) => {
      const provide = v[0];
      const config = v[1];

      return {
        provide: provide,
        implementations: config
      }
    });
  }
}
