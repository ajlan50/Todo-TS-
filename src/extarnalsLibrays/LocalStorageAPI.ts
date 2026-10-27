// your can make a static bhaviar  useing name space
export namespace nameLocal {
  export type TypeGuard<T> = (value: unknown) => value is T;
  export class LocalStorageAPI<T> {
    constructor(
      private readonly key: string,
      private readonly isValid: TypeGuard<T>,
    ) {}

    load(): T[] {
      const storedValue = localStorage.getItem(this.key);
      if (storedValue === null) return [];

      const parsed: unknown = JSON.parse(storedValue);
      if (!Array.isArray(parsed)) {
        throw new TypeError(`Stored value for "${this.key}" must be an array.`);
      }

      const result = [];
      for (const [index, item] of parsed.entries()) {
        if (!this.isValid(item)) {
          // If you don't throw an error and just want to skip:
          continue;
        }
        result.push(item);
      }
      return result;
    }

    save(items: T[]): void {
      localStorage.setItem(this.key, JSON.stringify(items));
    }
  }
}
