import { TodoEntity } from './todo.entity';

export class Todo extends TodoEntity {
  constructor(input: TodoEntity) {
    super();
    this.title = input.title;
    this.status = input.status;
    this.description = input.description;
  }

  public get Title() {
    return this.title;
  }
}
