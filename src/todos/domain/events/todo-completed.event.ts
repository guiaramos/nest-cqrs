import { IEvent } from '@nestjs/cqrs';
import { TodoProperties, TodoStatus } from '../aggregates/todo.aggr';

export class TodoCompletedEvent
  implements IEvent, Pick<TodoProperties, 'status'>
{
  readonly status: TodoStatus;
}
