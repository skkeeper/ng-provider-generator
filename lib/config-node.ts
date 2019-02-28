import {Class, AngularProvider} from './globals'

import {EnvironmentKey} from './environment-key'
import {Utils} from './utils'

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
      useFactory: this.providerFactoryGenerator.bind(this),
      deps: Utils.getConstructorArgumentTypes(toInstantiate)
    }
  }

  private getClassToInstantiate () : Class {
    const toInstantiate = this.implementations.get(this.environmentKey.get());

    if (typeof toInstantiate === 'undefined') {
      throw new Error();
    }

    return toInstantiate;
  }

  private providerFactoryGenerator(deps: Class[]) {
    const toInstantiate = this.getClassToInstantiate();

    return new toInstantiate(deps);
  }
}
