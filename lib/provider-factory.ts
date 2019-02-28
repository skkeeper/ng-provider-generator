import { Class, ImplementationsConfigObject } from './globals';

import { ConfigNode } from './config-node'
import { EnvironmentKey } from './environment-key';
import { ProviderConfig } from './provider-config';
import { InjectableStorage } from './injectable-storage';

export type GeneratorParams = {
  provide: string | Class,
  implementations: ImplementationsConfigObject | Map<any, Class>
}

export class ProviderFactory {
  static createFromDecorators() {
    return ProviderFactory.createFromObject(InjectableStorage.getInstance().getConfigObject());
  }

  static createFromObject(config: GeneratorParams[]) {
    const key = this.createKey();

    const nodes = config.map((cfg) => {
      let implementations;

      if (cfg.implementations instanceof Map) {
        implementations = cfg.implementations
      } else {
        let implementationsArg = Object.keys(cfg.implementations).reduce((acc: [string, Class][], key) => {
          acc.push([key, (<ImplementationsConfigObject>cfg.implementations)[key]]);

          return acc;
        }, []);
        implementations = new Map(implementationsArg);
      }

      return new ConfigNode(cfg.provide, implementations, key);
    });

    return ProviderFactory.createFromNodes(nodes, key);
  }

  private static createKey() : EnvironmentKey {
    return new EnvironmentKey();
  }

  private static createFromNodes(configNodes: ConfigNode[], key: EnvironmentKey) {
    return new ProviderConfig(configNodes, key);
  }
}
