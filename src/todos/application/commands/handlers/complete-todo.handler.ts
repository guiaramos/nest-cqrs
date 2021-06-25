import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todos/domain/repositories/todo.repo';
import { TodoRepositoryImpl } from 'src/todos/infrastructure/repositories/todo.repo';
import { CompleteTodoCommand } from '../defs';
import { yellowBright } from 'cli-color';

@CommandHandler(CompleteTodoCommand)
export class CompleteTodoHandler
  implements ICommandHandler<CompleteTodoCommand, void>
{
  constructor(
    @Inject(TodoRepositoryImpl) private readonly repo: TodoRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CompleteTodoCommand): Promise<void> {
    Logger.log(
      yellowBright('Async CompleteTodoHandler...', 'CompleteTodoCommand'),
    );

    const data = await this.repo.findById(command.id);

    const todo = this.eventPublisher.mergeObjectContext(data);

    todo.completed();

    await this.repo.updateOne(command.id, todo);

    todo.commit();
  }
}
