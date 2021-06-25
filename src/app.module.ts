import { Module } from '@nestjs/common';
import { DatabaseModule } from './todos/infrastructure/database/database.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [DatabaseModule, TodosModule],
})
export class AppModule {}
