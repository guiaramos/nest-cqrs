import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryModule } from 'src/infrastructure/repositories/repository.module';
import { CreateTodoHandler, SetStatusTodoHandler } from './commands/handlers';
import { TodoCreationSuccessEvent } from './events/defs';
import { AllTodosHandler } from './queries/handlers';
import { TodoSagas } from './sagas/todo.saga';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [
    // Commands
    CreateTodoHandler,
    SetStatusTodoHandler,
    // Events
    TodoCreationSuccessEvent,
    // Sagas
    TodoSagas,
    // Queries
    AllTodosHandler,
  ],
})
export class ApplicationModule {}
