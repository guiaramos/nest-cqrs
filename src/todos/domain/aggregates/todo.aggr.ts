import { AggregateRoot } from '@nestjs/cqrs';
import { TodoCompletedEvent, TodoCreatedEvent } from '../events';

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
  private readonly _id?: string;
  private status?: TodoStatus;
  private title: string;
  private content: string;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;
  private readonly completedAt?: Date;

  constructor(data: TodoProperties) {
    super();
    this._id = data._id;
    this.status = data.status;
    this.title = data.title;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.completedAt = data.completedAt;
  }

  public get properties(): TodoProperties {
    return {
      _id: this._id,
      content: this.content,
      title: this.title,
      completedAt: this.completedAt,
      updatedAt: this.updatedAt,
      status: this.status,
      createdAt: this.createdAt,
    };
  }

  created(): void {
    this.apply(Object.assign(new TodoCreatedEvent(), this));
  }

  completed(): void {
    this.status = TodoStatus.COMPLETED;
    this.apply(Object.assign(new TodoCompletedEvent(), this));
  }
}
