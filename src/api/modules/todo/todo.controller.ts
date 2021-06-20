import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoCommand } from 'src/application/commands/defs/create-todo.command';

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
}
