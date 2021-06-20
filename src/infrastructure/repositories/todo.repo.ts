import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoEntity } from 'src/domain/aggregates';
import { Todo } from 'src/domain/aggregates/todo';
import { TodoModel, TodoDocument } from '../models/todo.model';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(TodoModel.name) private readonly model: Model<TodoDocument>,
  ) {}

  async create(input: Todo): Promise<TodoEntity> {
    const todo = new this.model(input);
    return await todo.save();
  }
}
