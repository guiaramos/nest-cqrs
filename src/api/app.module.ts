import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [DatabaseModule, TodoModule],
})
export class AppModule {}
