import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CompleteTodoCommand,
  CreateTodoCommand,
} from '../application/commands/defs';
import { CreateTodoBodyDTO } from './dto/create-todo.body.dto';
import { CompleteTodoParamDTO } from './dto/update-todo.param.dto';

@ApiTags('Todos')
@Controller('v1/todos')
export class TodoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() body: CreateTodoBodyDTO): Promise<void> {
    const command = new CreateTodoCommand(body.title, body.content);
    await this.commandBus.execute(command);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async completeTodo(@Param() param: CompleteTodoParamDTO): Promise<void> {
    const command = new CompleteTodoCommand(param.id);
    await this.commandBus.execute(command);
  }
}
