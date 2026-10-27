import type { HasId } from "../extarnalsLibrays/SingletonList";

export interface ITodo extends HasId {
  title: string;
  checked: boolean;
}

export function isTodo(value: unknown): value is ITodo {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "title" in value &&
    typeof value.title === "string" &&
    "checked" in value &&
    typeof value.checked === "boolean"
  );
}

export default class Todo implements ITodo, HasId {
  constructor(
    public id: string = "",
    public title: string,
    public checked: boolean = false,
  ) {}
}
