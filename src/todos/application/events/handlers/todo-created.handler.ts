import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoCreatedEvent } from 'src/todos/domain/events';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedHandler implements IEventHandler<TodoCreatedEvent> {
  async handle(event: TodoCreatedEvent): Promise<void> {
    Logger.log(`todo created: ${JSON.stringify(event)}`);
  }
}
