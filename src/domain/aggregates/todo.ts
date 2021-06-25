import { AggregateRoot } from '@nestjs/cqrs';

export enum TodoStatus {
  'ON_GOING' = 'ON_GOING',
  'COMPLETED' = 'COMPLETED',
}

export interface TodoProperties {
  readonly id: string;
  readonly status: TodoStatus;
  readonly title: string;
  readonly content: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly completedAt?: Date;
}

export class Todo extends AggregateRoot {
  private readonly id: string;
  private readonly status: TodoStatus;
  private readonly title: string;
  private readonly content: string;
  private readonly createdAt: string;
  private readonly updatedAt: string;
  private readonly completedAt?: Date;

  constructor(properties: TodoProperties) {
    super();
    this.id = properties.id;
    this.status = properties.status;
    this.title = properties.title;
    this.content = properties.content;
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;
    this.completedAt = properties.completedAt;
  }

  properties(): TodoProperties {
    return {
      id: this.id,
      status: this.status,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      completedAt: this.completedAt,
    };
  }

  create(): void {
    console.log('Method not implemented yet');
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
