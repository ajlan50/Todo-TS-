interface IList<T> {
  List: T[];
  add: (item: T) => void;
  remove: (item: T) => void;
  clear: () => void;
  getById: (id: string) => T | undefined;
}

interface HasId {
  id: string;
}

export default class List<T extends HasId> implements IList<T> {
  private static _instance: List<HasId> | null = null;
  private constructor(
    private _List: T[] = [],
    private readonly _localStorgKey: string,
  ) {
    this._List = _List;
    this._localStorgKey = _localStorgKey;
    this.load();
  }

  public static get instance() {
    if (this._instance == null)
      this._instance = new List<HasId>(undefined, "todoList");
    return this._instance;
  }
  public get List(): T[] {
    return this._List;
  }

  private load(): void {
    const storedList = localStorage.getItem(this._localStorgKey);
    if (storedList === null) {
      this._List = [];
      return;
    }

    try {
      const parsed: unknown = JSON.parse(storedList);
      this._List = Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
      this._List = [];
    }
  }

  save(): void {
    localStorage.setItem(this._localStorgKey, JSON.stringify(this._List));
  }

  add(item: T): void {
    this._List.push(item);
    this.save();
  }

  remove(item: T): void {
    const index = this._List.indexOf(item);
    if (index != -1) {
      this._List.splice(index, 1);
      this.save();
    }
  }

  getById(id: string): T | undefined {
    return this._List.find((item) => item.id == id);
  }

  clear(): void {
    this._List = [];
    this.save();
  }

  public forEach(callback: (item: T, index: number, array: T[]) => void): void {
    this._List.forEach(callback);
  }
}
