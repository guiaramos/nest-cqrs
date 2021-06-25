import { ICommand } from '@nestjs/cqrs';

export class CompleteTodoCommand implements ICommand {
  constructor(readonly id: string) {}
}
