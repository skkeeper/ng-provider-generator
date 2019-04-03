import { AngularProvider, Class } from './globals';

import { ConfigNode } from './config-node'
import { EnvironmentKey } from './environment-key';

export class ProviderConfig {
  constructor(
    private readonly configNodes: ConfigNode[],
    private readonly key: EnvironmentKey) {}

  setEnvironment(key: any) {
    this.key.set(key);
  }

  getConfig() : AngularProvider[] {
    return this.configNodes.map((node) => {
      return node.get();
    });
  }
}
