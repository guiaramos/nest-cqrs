import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { cyan } from 'cli-color';
import { TodoCompletedEvent } from 'src/todos/domain/events';

@EventsHandler(TodoCompletedEvent)
export class TodoCompletedHandler implements IEventHandler<TodoCompletedEvent> {
  async handle(event: TodoCompletedEvent): Promise<void> {
    Logger.log(cyan(JSON.stringify(event), 'TodoCompletedEvent'));
  }
}
