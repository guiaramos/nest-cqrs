import { TodoStatus } from './todo-status.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class TodoEntity {
  _id?: string;

  @IsEnum(TodoStatus)
  status: TodoStatus;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}
