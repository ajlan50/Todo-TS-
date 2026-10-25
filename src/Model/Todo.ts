export interface ITodo {
  id: string;
  title: string;
  checked: boolean;
}

export default class Todo implements ITodo {
  constructor(
    public id: string = "",
    public title: string,
    public checked: boolean = false,
  ) {
    this.id = id;
    this.title = title;
    this.checked = checked;
  }
}
