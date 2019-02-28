import { InjectableStorage } from './injectable-storage';

import { BaseApi, MockApi, RealApi } from '../tests/dual-config-env';

describe('Injectable', () => {
  test('saves the right configurations for the dual-config env', () => {
    const config = InjectableStorage.getInstance().getConfigObject()[0];
    expect(config.provide).toBe(BaseApi);
    expect(config.implementations['mock']).toBe(MockApi);
    expect(config.implementations['real']).toBe(RealApi);
  })
});

