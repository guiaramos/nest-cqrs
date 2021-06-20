import { Module } from '@nestjs/common';
import { ModelModule } from '../models/model.module';
import { TodoRepository } from './todo.repo';

@Module({
  imports: [ModelModule],
  providers: [TodoRepository],
  exports: [TodoRepository],
})
export class RepositoryModule {}
