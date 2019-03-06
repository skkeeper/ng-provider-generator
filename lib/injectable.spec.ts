import { InjectableStorage } from './injectable-storage';
import { Injectable } from './injectable';

import { BaseApi, MockApi, RealApi } from '../tests/dual-config-env';

describe('Injectable', () => {
  test('is declared', () => {
    expect(Injectable).toBeDefined();
  });

  test('saves the right configurations for the dual-config env', () => {
    const config = InjectableStorage.getInstance().getConfigObject()[0];
    expect(config.provide).toBe(BaseApi);
    expect(config.implementations['mock']).toBe(MockApi);
    expect(config.implementations['real']).toBe(RealApi);
  })
});

