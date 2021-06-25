import { Todo } from '../aggregates/todo.aggr';

export interface TodoRepository {
  create(todo: Todo): Promise<void>;
}
