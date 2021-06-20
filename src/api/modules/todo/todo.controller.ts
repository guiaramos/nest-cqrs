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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTodoCommand,
  SetStatusTodoCommand,
} from 'src/application/commands/defs';
import { AllTodosQuery } from 'src/application/queries/defs';
import { Todo } from 'src/domain/aggregates/todo';

@Controller('v1/todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Get()
  async getTodoCollection() {
    const todos = await this.queryBus.execute<AllTodosQuery, Todo[]>(
      new AllTodosQuery(),
    );

    return todos;
  }
}
