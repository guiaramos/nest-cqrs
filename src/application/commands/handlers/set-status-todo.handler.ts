import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/infrastructure/repositories/todo.repo';
import { SetStatusTodoCommand } from '../defs/set-status-todo.command';

@CommandHandler(SetStatusTodoCommand)
export class SetStatusTodoHandler
  implements ICommandHandler<SetStatusTodoCommand>
{
  constructor(@Inject(TodoRepository) private readonly repo: TodoRepository) {}

  async execute(command: SetStatusTodoCommand) {
    Logger.verbose('SetStatusTodoCommand ...');
    const todo = await this.repo.getOne(command.todoId);

    if (!todo) {
      throw new BadRequestException({
        message: `TODO id: ${command.todoId} not found`,
      });
    }

    todo.status = command.status;

    await this.repo.updateOne(todo);
  }
}
