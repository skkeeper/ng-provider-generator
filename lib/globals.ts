export type AngularProvider = {
  provide: string | Class,
  useClass: Class
}

export type Class = (new (...args: any[]) => any);

export type ImplementationsConfigObject = {[key: string]: Class};

