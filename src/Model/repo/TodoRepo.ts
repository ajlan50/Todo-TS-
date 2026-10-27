import { type ITodo } from "../Todo";
import LocalStorageAPI from "../../extarnalsLibrays/LocalStorageAPI";
import SingletonList, {
  type HasId,
} from "../../extarnalsLibrays/SingletonList";

export default class TodoRepo {
  constructor(
    public readonly list: SingletonList<ITodo>,
    private readonly storage?: LocalStorageAPI<ITodo>,
  ) {
    try {
      if (storage) list.replaceAll(storage.load());
    } catch (er) {
      console.error(er);
    }
    this.save();
  }

  add(todo: ITodo): void {
    this.list.add(todo);
    this.save();
  }

  remove(todo: ITodo): void {
    this.list.remove(todo);
    this.save();
  }

  clear(): void {
    this.list.clear();
    this.save();
  }

  save(): void {
    this.storage?.save(this.list.List);
  }
}
