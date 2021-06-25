import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoStatus } from 'src/todos/domain/aggregates/todo.aggr';

export type TodoDocument = Todo & Document;

@Schema({
  collection: 'todos',
  collation: {
    locale: 'ko',
    strength: 1,
    caseLevel: true,
  },
  timestamps: true,
})
class Todo {
  @Prop()
  readonly title: string;
  @Prop({ enum: TodoStatus, default: TodoStatus.ON_GOING })
  readonly status: TodoStatus;
  @Prop()
  readonly content: string;
  @Prop()
  readonly completedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
