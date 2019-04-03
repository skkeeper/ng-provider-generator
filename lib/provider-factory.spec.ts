import {ProviderFactory} from './provider-factory';

import { ProviderConfig } from './provider-config';

import {
  BaseApi,
  MockApi,
  MockHttp,
  MockLog,
  RealApi,
  RealHttp,
  RealLog,
  factoryObjectParams,
  factoryObjectWithStringParams,
  factoryMapParams
} from '../tests/dual-config-env'
import { Class } from './globals';

let generator: ProviderConfig;

function dualEnvironmentTests(provide: Class) {
  test('constructor', () => {
    expect(generator).toBeInstanceOf(ProviderConfig);
  });

  test('errors out if no environment is selected', () => {
    expect(() => generator.getConfig()).toThrow();
  });

  test('getConfig() returns array', () => {
    generator.setEnvironment('real');
    expect(generator.getConfig()).toBeInstanceOf(Array);
  });

  test('returns real environment config', () => {
    generator.setEnvironment('real');
    const generated = generator.getConfig()[0];
    expect(generated.provide).toBe(provide);
    expect(generated.useClass).toBe(RealApi);
  });

  test('returns real environment config', () => {
    generator.setEnvironment('mock');
    const generated = generator.getConfig()[0];
    expect(generated.provide).toBe(provide);
    expect(generated.useClass).toBe(MockApi);
  });
}

describe.each([
  [factoryObjectParams],
  [factoryObjectWithStringParams],
  [factoryMapParams]
])('ProviderGenerator: dual environment configuration', (config) => {
  beforeEach(() => {
    generator = ProviderFactory.createFromObject(config);
  });

  dualEnvironmentTests(config[0].provide);
});


describe('ProviderGenerator: dual enviroment configuration with decorators', () => {
  beforeEach(() => {
    generator = ProviderFactory.createFromDecorators();
  });

  dualEnvironmentTests(BaseApi);
});

