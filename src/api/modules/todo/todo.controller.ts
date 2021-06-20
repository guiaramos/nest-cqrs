import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateTodoCommand,
  SetStatusTodoCommand,
} from 'src/application/commands/defs';

@Controller('v1/todos')
export class TodoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(@Body() todo: CreateTodoCommand) {
    await this.commandBus.execute(
      new CreateTodoCommand(todo.title, todo.description),
    );
  }

  @Patch('/:todoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateTodo(
    @Param('todoId') todoId: string,
    @Body() todo: Omit<SetStatusTodoCommand, 'todoId'>,
  ) {
    await this.commandBus.execute(
      new SetStatusTodoCommand(todoId, todo.status),
    );
  }
}
