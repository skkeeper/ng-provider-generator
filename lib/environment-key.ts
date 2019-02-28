export class EnvironmentKey {
  private key: any = null;

  constructor() {

  }

  public set(key: any) {
    this.key = key;
  }

  public get() {
    if (this.key === null) {
      throw new Error('EnvironmentKey cannot be read when null.');
    }

    return this.key;
  }
}
