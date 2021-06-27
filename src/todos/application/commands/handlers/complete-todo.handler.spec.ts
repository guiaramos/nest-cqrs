import { ModuleMetadata, Provider } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'src/todos/domain/repositories/todo.repo';
import { CompleteTodoCommand } from '../defs';
import { CompleteTodoHandler } from './complete-todo.handler';

describe('CompleteTodoHandler', () => {
  let handler: CompleteTodoHandler;
  let repo: TodoRepository;
  let publisher: EventPublisher;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: 'TodoRepositoryImpl',
      useValue: {},
    };

    const publisherProvider: Provider = {
      provide: EventPublisher,
      useValue: {},
    };

    const providers: Provider[] = [
      CompleteTodoHandler,
      repoProvider,
      publisherProvider,
    ];

    const metadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(metadata).compile();

    handler = testModule.get<CompleteTodoHandler>(CompleteTodoHandler);
    repo = testModule.get<TodoRepository>('TodoRepositoryImpl');
    publisher = testModule.get<EventPublisher>(EventPublisher);
  });

  describe('execute', () => {
    it('should execute CompleteTodoCommand', async () => {
      repo.findById = jest.fn().mockResolvedValue(undefined);
      repo.updateOne = jest.fn().mockResolvedValue(undefined);
      publisher.mergeObjectContext = jest.fn().mockReturnValue({
        open: () => undefined,
        commit: () => undefined,
        completed: () => undefined,
      });

      const command = new CompleteTodoCommand('mockid');

      await expect(handler.execute(command)).resolves.toEqual(undefined);
    });
  });
});
