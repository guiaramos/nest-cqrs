import { ICommand } from '@nestjs/cqrs';

export class CreateTodoCommand implements ICommand {
  constructor(readonly title: string, readonly content: string) {}
}
