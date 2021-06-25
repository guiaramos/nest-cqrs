import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Todo } from 'src/todos/domain/aggregates/todo.aggr';
import { TodoRepository } from 'src/todos/domain/repositories/todo.repo';
import { TodoDocument } from '../schemas/todo.schema';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectModel('Todo') private readonly model: mongoose.Model<TodoDocument>,
  ) {}

  async create(data: Todo): Promise<void> {
    const doc = this.aggreateToDoc(data);
    await this.model.create(doc);
  }

  async updateOne(id: string, data: Todo): Promise<void> {
    const doc = this.aggreateToDoc(data);
    const update: mongoose.UpdateQuery<TodoDocument> = { $set: doc };
    const options: mongoose.QueryOptions = { new: true };

    await this.model
      .findByIdAndUpdate(mongoose.Types.ObjectId(id), update, options)
      .exec();
  }

  async findById(id: string): Promise<Todo> {
    const doc = await this.model.findById(id).exec();
    if (doc === null) {
      throw new NotFoundException(`Todo with id ${id} does not exists`);
    }

    return this.docToAggregate(doc);
  }

  async findAll(skip: number, limit: number): Promise<Todo[]> {
    const conditions: mongoose.FilterQuery<TodoDocument> = {};
    const docs = await this.model
      .find(conditions)
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return docs.map((doc) => this.docToAggregate(doc));
  }

  private aggreateToDoc(data: Todo): TodoDocument {
    return new this.model(data.properties);
  }

  private docToAggregate(doc: TodoDocument): Todo {
    return new Todo(doc);
  }
}
