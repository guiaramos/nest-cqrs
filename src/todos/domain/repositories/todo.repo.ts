import { Todo } from '../aggregates/todo.aggr';

export interface TodoRepository {
  create(data: Todo): Promise<void>;
  updateOne(id: string, data: Todo): Promise<void>;
  findById(id: string): Promise<Todo>;
  findAll(skip: number, limit: number): Promise<Todo[]>;
}
