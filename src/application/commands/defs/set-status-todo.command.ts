import { ICommand } from '@nestjs/cqrs';
import { TodoStatus } from 'src/domain/aggregates';

export class SetStatusTodoCommand implements ICommand {
  constructor(
    public readonly todoId: string,
    public readonly status: TodoStatus,
  ) {}
}
