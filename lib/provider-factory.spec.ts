import {ProviderFactory, GeneratorParams} from './provider-factory';

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

function dualEnvironmentWithParamsSetup (config: GeneratorParams[]) {
  beforeEach(() => {
    generator = ProviderFactory.createFromObject(config);
  });

  dualEnvironmentTests(config[0].provide);
}

function dualEnvironmentTests(provide: Class | string) {
  test('constructor', () => {
    expect(generator).toBeTruthy();
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
    expect(generated.provide).toEqual(provide);
    expect(generated.useFactory).toBeTruthy();
    expect(generated.useFactory.call(generated.deps)).toBeInstanceOf(RealApi);
    const firstDep = generated.deps[0];
    expect(firstDep).toEqual(RealLog);
    const secondDep = generated.deps[1];
    expect(secondDep).toEqual(RealHttp);
  });

  test('returns real environment config', () => {
    generator.setEnvironment('mock');
    const generated = generator.getConfig()[0];
    expect(generated.provide).toEqual(provide);
    expect(generated.useFactory.call(generated.deps)).toBeInstanceOf(MockApi);
    const firstDep = generated.deps[0];
    expect(firstDep).toEqual(MockHttp);
    const secondDep = generated.deps[1];
    expect(secondDep).toEqual(MockLog);
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

describe('ProviderGenerator: dual environment configuration', () => {
  dualEnvironmentWithParamsSetup(factoryObjectParams);
});


describe('ProviderGenerator: dual environment configuration with string for provide', () => {
  dualEnvironmentWithParamsSetup(factoryObjectWithStringParams);
});


describe('ProviderGenerator: dual environment configuration with Map for implementations', () => {
  dualEnvironmentWithParamsSetup(factoryMapParams);
});

describe('ProviderGenerator: dual enviroment configuration with decorators', () => {

})
