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
    expect(generated.useFactory).toBeTruthy();
    expect(generated.useFactory.call(generated.deps)).toBeInstanceOf(RealApi);
    const firstDep = generated.deps[0];
    expect(firstDep).toBe(RealLog);
    const secondDep = generated.deps[1];
    expect(secondDep).toBe(RealHttp);
  });

  test('returns real environment config', () => {
    generator.setEnvironment('mock');
    const generated = generator.getConfig()[0];
    expect(generated.provide).toBe(provide);
    expect(generated.useFactory.call(generated.deps)).toBeInstanceOf(MockApi);
    const firstDep = generated.deps[0];
    expect(firstDep).toBe(MockHttp);
    const secondDep = generated.deps[1];
    expect(secondDep).toBe(MockLog);
  });

  test('getDependencies() returns dependencies for real env', () => {
    generator.setEnvironment('real');
    const deps = generator.getDependencies();
    expect(deps).toContain(RealHttp);
    expect(deps).toContain(RealLog);
  });

  test('getDependencies() returns dependencies for mock env', () => {
    generator.setEnvironment('mock');
    const deps = generator.getDependencies();
    expect(deps).toContain(MockHttp);
    expect(deps).toContain(MockLog);
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

