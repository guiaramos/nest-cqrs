import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { yellowBright } from 'cli-color';
import { Todo } from 'src/todos/domain/aggregates/todo.aggr';
import { TodoRepository } from 'src/todos/domain/repositories/todo.repo';
import { TodoRepositoryImpl } from 'src/todos/infrastructure/repositories/todo.repo';
import { CreateTodoCommand } from '../defs';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler
  implements ICommandHandler<CreateTodoCommand, void>
{
  constructor(
    @Inject(TodoRepositoryImpl) private readonly repo: TodoRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateTodoCommand): Promise<void> {
    Logger.log(yellowBright('Async CreateTodoCommand...', 'CreateTodoCommand'));

    const data = new Todo({ title: command.title, content: command.content });

    const todo = this.eventPublisher.mergeObjectContext(data);

    todo.created();

    await this.repo.create(todo);

    todo.commit();
  }
}
