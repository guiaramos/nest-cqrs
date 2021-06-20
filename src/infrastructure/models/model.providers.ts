import { MongooseModule } from '@nestjs/mongoose';
import { TodoModel, TodoSchema } from './todo.model';

export const ModelProviders = MongooseModule.forFeature([
  { name: TodoModel.name, schema: TodoSchema },
]);
