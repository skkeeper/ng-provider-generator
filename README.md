# ng-provider-generator
![MIT licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg)

Generate an Angular Provider dynamically by setting an environment flag.

A common use case is having services that mock communication to a backend running
in parallel with real communication code. When starting the application a flag
decides what classes to inject.

# Requirements

- Angular 7+ (it probably works with older versions but I haven't tested. **Does not work with AngularJS**)
- Typescript (if you're running Angular you already have it)
- Typescript support for **emitDecoratorMetadata** and **experimentalDecorators**. This is the standard configuration for Angular so you shouldn't have to worry about this.

# Installation

Install the npm package:

`npm install ng-provider-generator`

# Usage

## Configuration by object parameters

Example configuration
```js

// provider-config.ts

export const providerConfig = [
  {
    provide: BaseApi,
    implementations: {
      real: RealApi,
      mock: MockApi
    }
  }
];

// app.module.ts

import { providerConfig } from './provider-config' 

import { ProviderFactory } from 'ng-provider-generator';

const provider = ProviderFactory.createFromObject(providerConfig);
provider.setEnvironment('mock');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ...
    provider.getConfig()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

The example above assumes the following service hierarchy:
```js
export class BaseApi {}

export class MockJson {}

export class MockLog {}

@Injectable
export class MockApi extends BaseApi {
  constructor(http: MockJson, log: MockLog) {
    super();
  }
}

export class RealHttp {}

export class RealLog {}

@Injectable
export class RealApi extends BaseApi {
  constructor(log: RealLog, http: RealHttp) {
    super();
  }
}
```

## Configuration by decorators

It's also possible to configure the environment with class decorators.

```js
import { Injectable } from 'ng-provider-generator';

export class BaseApi {}

export class MockJson {}

export class MockLog {}

@Injectable({
  provide: BaseApi,
  environmentKey: 'mock'
})
export class MockApi extends BaseApi {
  constructor(http: MockJson, log: MockLog) {
    super();
  }
}

export class RealHttp {}

export class RealLog {}

@Injectable({
  provide: BaseApi,
  environmentKey: 'real'
})
export class RealApi extends BaseApi {
  constructor(log: RealLog, http: RealHttp) {
    super();
  }
}
```

Make sure the classes that have the decorators are loaded and then generate the configuration object with the factory:
```js
// app.module.ts

import { providerConfig } from './provider-config' 

import { ProviderFactory } from 'ng-provider-generator';

const provider = ProviderFactory.createFromDecorators();
provider.setEnvironment('mock');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ...
    provider.getConfig()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```



# Contribute

Feel free to contribute, just make sure you run all the present tests and write more to cover the code you're adding.

### Code of Conduct

Note that this project is released with a Contributor Code of Conduct (read code-of-conduct.md).
By participating in this project in any way you agree to abide by its terms.

# License

The MIT License

Copyright (c) 2019 Fábio André Damas

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
