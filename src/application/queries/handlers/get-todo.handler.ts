import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoEntity } from 'src/domain/aggregates';
import { TodoRepository } from 'src/infrastructure/repositories/todo.repo';
import { GetTodoQuery } from '../defs';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler {
  constructor(@Inject(TodoRepository) private readonly repo: TodoRepository) {}

  async execute(query: GetTodoQuery): Promise<TodoEntity> {
    Logger.verbose('GetTodoQuery ...');

    const todo = await this.repo.getOne(query.todoId);

    return todo;
  }
}
