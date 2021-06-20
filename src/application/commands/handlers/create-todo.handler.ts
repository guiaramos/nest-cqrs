import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { TodoCreationSuccessEvent } from 'src/application/events/defs';
import { TodoStatus } from 'src/domain/aggregates';
import { Todo } from 'src/domain/aggregates/todo';
import { TodoRepository } from 'src/infrastructure/repositories/todo.repo';
import { CreateTodoCommand } from '../defs/create-todo.command';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @Inject(TodoRepository) private readonly repo: TodoRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoCommand) {
    Logger.verbose('CreateTodoCommand...');

    const todo = new Todo({
      title: command.title,
      description: command.description,
      status: TodoStatus.IN_PROGRESS,
    });

    const createdTodo = await this.repo.createOne(todo);

    console.log(createdTodo);

    this.eventBus.publish(new TodoCreationSuccessEvent(createdTodo._id));
  }
}
