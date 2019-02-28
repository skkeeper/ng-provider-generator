import {Injectable} from '../lib/injectable'

export class BaseApi {

}

export class MockHttp {

}

export class MockLog {

}

@Injectable({
  provide: BaseApi,
  environmentKey: 'mock'
})
export class MockApi extends BaseApi {
  constructor(http: MockHttp, log: MockLog) {
    super();
  }
}

export class RealHttp {

}

export class RealLog {

}

@Injectable({
  provide: BaseApi,
  environmentKey: 'real'
})
export class RealApi extends BaseApi {
  constructor(log: RealLog, http: RealHttp) {
    super();
  }
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
