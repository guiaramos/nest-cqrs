import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoCommand } from '../application/commands/defs';
import { CreateTodoBodyDTO } from './dto/create-todo.body.dto';

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
}
