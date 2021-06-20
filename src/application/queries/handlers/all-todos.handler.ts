import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoEntity } from 'src/domain/aggregates';
import { TodoRepository } from 'src/infrastructure/repositories/todo.repo';
import { AllTodosQuery } from '../defs';

@QueryHandler(AllTodosQuery)
export class AllTodosHandler implements IQueryHandler {
  constructor(@Inject(TodoRepository) private readonly repo: TodoRepository) {}

  async execute(query: AllTodosQuery): Promise<TodoEntity[]> {
    Logger.verbose('AllTodosQuery...');
    console.log(query);

    const todos = await this.repo.getAll();

    return todos;
  }
}
