import { EnvironmentKey } from "./environment-key";

describe('EnvironmentKey: string', () => {
  let environmentKey: EnvironmentKey;

  beforeAll(() => {
    environmentKey = new EnvironmentKey();
  });

  test('creates', () => {
    expect(environmentKey).toBeInstanceOf(EnvironmentKey);
  });

  test('throws on get() if no key was set', () => {
    expect(() => {environmentKey.get()}).toThrow();
  });

  test('set() and get()', () => {
    const keyToSet = 'mock';
    expect(environmentKey.set(keyToSet)).toBeUndefined();
    expect(environmentKey.get()).toEqual(keyToSet);
  });
});

describe('EnvironmentKey: Symbol', () => {
  let environmentKey: EnvironmentKey;

  beforeAll(() => {
    environmentKey = new EnvironmentKey();
  });

  test('set() and get()', () => {
    const keyToSet = Symbol('mock');
    expect(environmentKey.set(keyToSet)).toBeUndefined();
    expect(environmentKey.get()).toEqual(keyToSet);
  })
});

describe('EnvironmentKey: number', () => {
  let environmentKey: EnvironmentKey;

  beforeAll(() => {
    environmentKey = new EnvironmentKey();
  });

  test('set() and get()', () => {
    enum Env {
      MOCK = 1
    }
    expect(environmentKey.set(Env.MOCK)).toBeUndefined();
    expect(environmentKey.get()).toEqual(Env.MOCK);
  })
});
