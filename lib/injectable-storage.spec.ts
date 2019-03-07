import { InjectableStorage } from "./injectable-storage";

interface BaseApi {}

class MockApi implements BaseApi {}

class RealApi implements BaseApi {}

describe('InjectableStorage', () => {
  const instance = InjectableStorage.getInstance();

  test('is singleton', () => {
    const newInstance = InjectableStorage.getInstance();
    expect(instance).toBe(newInstance);
  });

  test('insert couple of classes', () => {
    const storage = InjectableStorage.getInstance();
    expect(storage.save('BaseApi', 'mock', MockApi)).toBeUndefined();
    expect(storage.save('BaseApi', 'real', RealApi)).toBeUndefined();
  });

  test('getConfigObject()', () => {
    expect(instance.getConfigObject()).toEqual([
      {
        provide: 'BaseApi',
        implementations: {
          'mock': MockApi,
          'real': RealApi
        }
      }
    ]);
  });
});
