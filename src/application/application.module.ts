import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryModule } from 'src/infrastructure/repositories/repository.module';
import { CreateTodoHandler, SetStatusTodoHandler } from './commands/handlers';
import { TodoCreationSuccessEvent } from './events/defs';
import { TodoSagas } from './sagas/todo.saga';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [
    // Handlers
    CreateTodoHandler,
    SetStatusTodoHandler,
    // Events
    TodoCreationSuccessEvent,
    // Sagas
    TodoSagas,
  ],
})
export class ApplicationModule {}
