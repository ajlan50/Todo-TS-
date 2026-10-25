import "./css/style.css";
import TodoList from "./view/TodoList";
import List from "./Model/repo/List";
import Todo, { type ITodo } from "./Model/Todo";

const initApp = (): void => {
  const form = document.getElementById("itemEntryForm") as HTMLFormElement;
  const titleInput = document.getElementById("newItem") as HTMLInputElement;
  const errorLable = document.getElementById("error") as HTMLParagraphElement;
  const clearBtn = document.getElementById(
    "clearItemsButton",
  ) as HTMLButtonElement;

  const Todos: List<ITodo> = (List<ITodo>).instance as List<ITodo>;
  const ULTodos: TodoList = TodoList.instance;

  if (Todos.List.length > 0) ULTodos.render(Todos);

  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    let title = "";
    title = titleInput.value.trim();
    if (!title) {
      errorLable.innerText = "please innter the todo title! ^_^";
    }

    let todo = new Todo(`${Math.random()}`, title);

    titleInput.value = "";
    Todos.add(todo);
    ULTodos.render(Todos);
  });

  clearBtn.addEventListener("click", () => {
    Todos.clear();
    ULTodos.clear();
  });
};
document.addEventListener("DOMContentLoaded", initApp);
