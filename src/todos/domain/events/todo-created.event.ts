import { IEvent } from '@nestjs/cqrs';
import { TodoProperties, TodoStatus } from '../aggregates/todo.aggr';

export class TodoCreatedEvent implements IEvent, TodoProperties {
  readonly id?: string;
  readonly title: string;
  readonly status?: TodoStatus;
  readonly content: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly completedAt?: Date;
}
