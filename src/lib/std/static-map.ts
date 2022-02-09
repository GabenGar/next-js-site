/**
 * Like `Map`, but entries cannot be modified after instantiation.
 */
export class StaticMap extends Map {
  constructor() {
    super();
  }
  set() {
    return this;
  }
}
