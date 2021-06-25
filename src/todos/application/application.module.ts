import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { TodoController } from '../interface/todo.controller';
import { CompleteTodoHandler, CreateTodoHandler } from './commands/handlers';
import { TodoCompletedHandler, TodoCreatedHandler } from './events/handlers';

const commands: Provider[] = [CreateTodoHandler, CompleteTodoHandler];
const events: Provider[] = [TodoCreatedHandler, TodoCompletedHandler];
const sagas: Provider[] = [];
const queries: Provider[] = [];

const providers: Provider[] = [...commands, ...events, ...sagas, ...queries];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...providers],
  exports: [...providers],
  controllers: [TodoController],
})
export class ApplicationModule {}
