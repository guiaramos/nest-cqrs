import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { yellowBright } from 'cli-color';
import { Todo } from 'src/todos/domain/aggregates/todo.aggr';
import { TodoRepository } from 'src/todos/domain/repositories/todo.repo';
import { TodoRepositoryImpl } from 'src/todos/infrastructure/repositories/todo.repo';
import { FindTodosQuery } from '../defs';

@QueryHandler(FindTodosQuery)
export class FindTodosHandler implements IQueryHandler<FindTodosQuery, Todo[]> {
  constructor(
    @Inject(TodoRepositoryImpl) private readonly repo: TodoRepository,
  ) {}

  async execute(query: FindTodosQuery): Promise<Todo[]> {
    Logger.log(yellowBright('Async FindTodosHandler...', 'FindTodosQuery'));

    const todos = this.repo.findAll(query.skip, query.limit);

    return todos;
  }
}
