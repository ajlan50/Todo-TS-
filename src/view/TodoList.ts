import type TodoRepo from "../Model/repo/TodoRepo";
import type { ITodo } from "../Model/Todo";

interface TodoListView {
  UL: HTMLUListElement;
  clear: () => void;
  render(repository: TodoRepo): void;
}

export default class TodoList implements TodoListView {
  private _UL: HTMLUListElement;
  static instance = new TodoList();
  private constructor() {
    this._UL = document.getElementById("listItems") as HTMLUListElement;
  }

  public get UL() {
    return this._UL;
  }

  clear = (): void => {
    this._UL.innerHTML = "";
  };

  render(repository: TodoRepo): void {
    const items = document.createDocumentFragment();

    repository.list.forEach((todo: ITodo) => {
      const item = document.createElement("li");

      item.className = "item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.checked;
      checkbox.id = todo.id;
      checkbox.addEventListener("change", () => {
        // const currentTodo = list.getById(todo.id);
        // if (!currentTodo) throw new Error("Todo does not exist");

        todo.checked = checkbox.checked;
        repository.save();
      });

      const label = document.createElement("label");
      label.htmlFor = todo.id;
      label.textContent = todo.title;

      const deleteButton = document.createElement("button");
      deleteButton.className = "button";
      deleteButton.type = "button";
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        // const currentTodo = list.getById(todo.id);
        // if (!currentTodo) throw new Error("Todo does not exist");

        repository.remove(todo);
        this.render(repository);
      });

      item.append(checkbox, label, deleteButton);
      items.append(item);
    });

    this._UL.replaceChildren(items);
  }
}
