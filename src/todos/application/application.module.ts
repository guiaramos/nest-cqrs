import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { TodoController } from '../interface/todo.controller';
import { CreateTodoHandler } from './commands/handlers';
import { TodoCreatedHandler } from './events/handlers';

const commands: Provider[] = [CreateTodoHandler];
const events: Provider[] = [TodoCreatedHandler];
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
