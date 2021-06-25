import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CompleteTodoCommand,
  CreateTodoCommand,
} from '../application/commands/defs';
import { FindTodosQuery } from '../application/queries/defs';
import { Todo } from '../domain/aggregates/todo.aggr';
import { CreateTodoBodyDTO } from './dto/create-todo.body.dto';
import { FindTodosQueryDTO } from './dto/find-todos.query.dto';
import { CompleteTodoParamDTO } from './dto/update-todo.param.dto';

@ApiTags('Todos')
@Controller('v1/todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Get()
  async getTodoCollection(
    @Query() queryDto: FindTodosQueryDTO,
  ): Promise<Todo[]> {
    console.log(JSON.stringify(queryDto));
    const query = new FindTodosQuery(queryDto.skip, queryDto.limit);
    return this.queryBus.execute(query);
  }
}
