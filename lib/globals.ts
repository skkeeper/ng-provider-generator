export type AngularProvider = {
  provide: string | Class,
  useFactory: Function,
  deps: Class[]
}

export type Class = (new (...args: any[]) => any);

export type ImplementationsConfigObject = {[key: string]: Class};

