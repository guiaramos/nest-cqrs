import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
