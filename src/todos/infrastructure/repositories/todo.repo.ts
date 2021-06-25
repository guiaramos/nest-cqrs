import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/todos/domain/aggregates/todo.aggr';
import { TodoRepository } from 'src/todos/domain/repositories/todo.repo';
import { TodoDocument } from '../schemas/todo.schema';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectModel('Todo') private readonly model: Model<TodoDocument>,
  ) {}

  async create(data: Todo): Promise<void> {
    const doc = this.aggreateToDoc(data);
    await this.model.create(doc);
  }

  private aggreateToDoc(data: Todo): TodoDocument {
    return new this.model(data.properties);
  }
}
