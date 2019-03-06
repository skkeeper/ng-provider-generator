import { EnvironmentKey } from "./environment-key";

// TODO: Add test to fail when set(undefined/null)
describe.each([
  ['mock'],
  [Symbol('mock')],
  [1]
])('EnvironmentKey: string', (keyValue) => {
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
    expect(environmentKey.set(keyValue)).toBeUndefined();
    expect(environmentKey.get()).toEqual(keyValue);
  });
});
