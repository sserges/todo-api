import { Drash } from "https://deno.land/x/drash/mod.ts";

let todos = [
  {
    id: 1,
    title: "Passer à Typescript",
    completed: false,
  },
  {
    id: 2,
    title: "Créer une API REST",
    completed: false,
  },
  {
    id: 3,
    title: "M'abonner à Devtheory",
    completed: false,
  },
];

export class TodoList extends Drash.Http.Resource {
  static paths = ["/todos"];

  public GET() {
    this.response.body = todos;
    return this.response;
  }
}

export class TodoElement extends Drash.Http.Resource {
  static paths = ["/todos/:id"];

  public GET() {
    const id = this.request.getPathParam("id");
    const todo = todos.find((t) => t.id == id);

    if (!todo) {
      throw new Drash.Exceptions.HttpException(
        404,
        `Todo with id ${id} not found`,
      );
    }
    this.response.body = todo;
    return this.response;
  }
}
