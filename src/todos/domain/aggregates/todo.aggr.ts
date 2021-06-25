import { AggregateRoot } from '@nestjs/cqrs';
import { TodoCreatedEvent } from '../events';

export enum TodoStatus {
  'ON_GOING' = 'ON_GOING',
  'COMPLETED' = 'COMPLETED',
}

export interface TodoProperties {
  readonly _id?: string;
  readonly status?: TodoStatus;
  readonly title: string;
  readonly content: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly completedAt?: Date;
}

export class Todo extends AggregateRoot {
  private readonly data: TodoProperties;

  constructor(data: TodoProperties) {
    super();
    this.data = data;
  }

  public get properties(): TodoProperties {
    return this.data;
  }

  create(): void {
    this.apply(Object.assign(new TodoCreatedEvent(), this));
  }

  update(): void {
    console.log('Method not implemented yet');
  }

  complete(): void {
    console.log('Method not implemented yet');
  }

  remove(): void {
    console.log('Method not implemented yet');
  }
}
