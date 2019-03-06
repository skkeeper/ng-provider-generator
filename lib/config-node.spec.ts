import {ConfigNode} from './config-node';
import { BaseApi, MockApi, MockHttp, MockLog, RealApi, RealHttp, RealLog} from '../tests/dual-config-env'
import { EnvironmentKey } from './environment-key';

describe('ConfigNode', () => {
  let node: ConfigNode;
  const provide = BaseApi;
  const environmentKeyReal = 'real';
  const environmentKeyMock = 'mock';
  let environmentKey: EnvironmentKey;

  beforeAll(() => {
    environmentKey = new EnvironmentKey();
    node = new ConfigNode(
      provide,
      new Map([
        [environmentKeyReal, RealApi],
        [environmentKeyMock, MockApi]
      ]),
      environmentKey);
  });

  test('constructor', () => {
    expect(node).toBeInstanceOf(ConfigNode);
  });

  test('throws error when environment key not set', () => {
    expect(() => {node.get()}).toThrow();
  });

  test('get() returns an Angular Provider for "real" env', () => {
    environmentKey.set(environmentKeyReal);
    const generated = node.get();
    expect(generated.provide).toEqual(provide);
    expect(generated.useFactory).toBeTruthy();
    expect(generated.useFactory.call(generated.deps)).toBeInstanceOf(RealApi);
    const firstDep = generated.deps[0];
    expect(firstDep).toEqual(RealLog);
    const secondDep = generated.deps[1];
    expect(secondDep).toEqual(RealHttp);
  });

  test('get() returns an Angular Provider for "mock" env', () => {
    environmentKey.set(environmentKeyMock);
    const generated = node.get();
    expect(generated.provide).toEqual(provide);
    expect(generated.useFactory).toBeTruthy();
    expect(generated.useFactory.call(generated.deps)).toBeInstanceOf(MockApi);
    const firstDep = generated.deps[0];
    expect(firstDep).toEqual(MockHttp);
    const secondDep = generated.deps[1];
    expect(secondDep).toEqual(MockLog);
  });
});
