import "./css/style.css";
import TodoList from "./view/TodoList";
import SingletonList from "./extarnalsLibrays/SingletonList";
import { nameLocal } from "./extarnalsLibrays/LocalStorageAPI"; 

import localStorge  = nameLocal.LocalStorageAPI;

import TodoRepo from "./Model/repo/TodoRepo";
import Todo, { isTodo, type ITodo } from "./Model/Todo";

const initApp = (): void => {
  const form = document.getElementById("itemEntryForm") as HTMLFormElement;
  const titleInput = document.getElementById("newItem") as HTMLInputElement;
  const errorLable = document.getElementById("error") as HTMLParagraphElement;
  const clearBtn = document.getElementById(
    "clearItemsButton",
  ) as HTMLButtonElement;

  // TEMP DATA
  const data: ITodo[] = [
    { id: "0.30026175264694954", title: "asdfa", checked: false },
    { id: "0.7572143694024591", title: "fa", checked: false },
    { id: "0.9851425221262609", title: "asf", checked: false },
    { id: "0.17535615761649836", title: "asdf", checked: false },
  ];

  // you can mange your app by adding a localsotge or not
  try {
    const Todos = new TodoRepo(
      SingletonList.getInstance<ITodo>(data),
       new localStorge<ITodo>("todoList", isTodo),
    );

    const ULTodos: TodoList = TodoList.instance;

    if (Todos.list.List.length > 0) ULTodos.render(Todos);

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
  } catch (er) {
    // we could make a toster error massage her her
    console.log("erorr");

    console.error((er as Error).message);
  }
};
document.addEventListener("DOMContentLoaded", initApp);
