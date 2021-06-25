import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoRepositoryImpl } from './repositories/todo.repo';
import { TodoSchema } from './schemas/todo.schema';

const providers: Provider[] = [TodoRepositoryImpl];

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  providers: [...providers],
  exports: [...providers],
})
export class InfrastructureModule {}
