import {Injectable} from '../lib/injectable'

export class BaseApi {

}

@Injectable({
  provide: BaseApi,
  environmentKey: 'mock'
})
export class MockApi extends BaseApi {

}

@Injectable({
  provide: BaseApi,
  environmentKey: 'real'
})
export class RealApi extends BaseApi {

}


export const factoryObjectParams = [
  {
    provide: BaseApi,
    implementations: {
      real: RealApi,
      mock: MockApi
    }
  }
];

export const factoryObjectWithStringParams = [
  {
    provide: 'BaseApi',
    implementations: {
      real: RealApi,
      mock: MockApi
    }
  }
];

export const factoryMapParams = [
  {
    provide: 'BaseApi',
    implementations: new Map([
      ['real', RealApi],
      ['mock', MockApi]
    ])
  }
];
