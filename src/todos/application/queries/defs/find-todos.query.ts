import { IQuery } from '@nestjs/cqrs';

export class FindTodosQuery implements IQuery {
  constructor(readonly skip: number, readonly limit: number) {}
}
