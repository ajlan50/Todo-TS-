interface ISingletonList<T> {
  List: T[];
  add: (item: T) => void;
  remove: (item: T) => void;
  clear: () => void;
  getById: (id: string) => T | undefined;
}

export interface HasId {
  id: string;
}

export default class SingletonList<T extends HasId> implements ISingletonList<T> {
  private static _instance: SingletonList<HasId> | null = null;

  private constructor(private _List: T[] = []) {}

  public static getInstance<T extends HasId>(data: T[] = []): SingletonList<T> {
    if (this._instance === null) {
      this._instance = new SingletonList<T>(data);
    }

    return this._instance as SingletonList<T>;
  }

  public get List(): T[] {
    return this._List;
  }

  add(item: T): void {
    this._List.push(item);
  }

  remove(item: T): void {
    const index = this._List.indexOf(item);
    if (index != -1) {
      this._List.splice(index, 1);
    }
  }

  getById(id: string): T | undefined {
    return this._List.find((item) => item.id == id);
  }

  clear(): void {
    this._List = [];
  }

  replaceAll(data: T[]) {
    this._List = data;
  }

  public forEach(callback: (item: T, index: number, array: T[]) => void): void {
    this._List.forEach(callback);
  }
}
