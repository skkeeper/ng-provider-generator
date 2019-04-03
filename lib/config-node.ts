import {Class, AngularProvider} from './globals'

import {EnvironmentKey} from './environment-key'

export class ConfigNode {
  constructor(
    private readonly provide: Class | string,
    private readonly implementations: Map<any, Class>,
    private readonly environmentKey: EnvironmentKey) {

  }

  get() : AngularProvider {
    const toInstantiate = this.getClassToInstantiate();

    return {
      provide: this.provide,
      useClass: toInstantiate
    }
  }

  private getClassToInstantiate () : Class {
    const toInstantiate = this.implementations.get(this.environmentKey.get());

    if (typeof toInstantiate === 'undefined') {
      throw new Error();
    }

    return toInstantiate;
  }
}
