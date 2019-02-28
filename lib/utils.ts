import 'reflect-metadata';

import { Class } from './globals';

export class Utils {
  static getConstructorArgumentTypes(classArg: Class) {
    return Reflect.getOwnMetadata('design:paramtypes', classArg);
  }
}
