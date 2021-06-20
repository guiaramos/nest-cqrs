import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TodoEntity } from 'src/domain/aggregates';
import { Todo } from 'src/domain/aggregates/todo';
import { TodoModel, TodoDocument } from '../models/todo.model';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(TodoModel.name)
    private readonly model: mongoose.Model<TodoDocument>,
  ) {}

  async createOne(input: Todo): Promise<TodoEntity> {
    const todo = new this.model(input);
    return await todo.save();
  }

  async getOne(id: string): Promise<TodoEntity> {
    return await this.model.findById(id).exec();
  }

  async updateOne(input: Partial<Todo>): Promise<TodoEntity> {
    const update: mongoose.UpdateQuery<TodoEntity> = {
      $set: input,
    };

    return await this.model
      .findByIdAndUpdate(input._id, update, { new: true })
      .exec();
  }
}
