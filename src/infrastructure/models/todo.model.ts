import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoStatus } from 'src/domain/aggregates';

export type TodoDocument = TodoModel & Document;

@Schema({ collection: 'todos', timestamps: true })
export class TodoModel {
  @Prop({ type: String, enum: TodoStatus })
  status: TodoStatus;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(TodoModel);
