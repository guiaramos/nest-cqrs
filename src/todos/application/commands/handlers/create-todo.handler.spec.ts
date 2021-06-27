import { ModuleMetadata, Provider } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { TodoRepository } from 'src/todos/domain/repositories/todo.repo';
import { CreateTodoCommand } from '../defs';
import { CreateTodoHandler } from './create-todo.handler';

describe('CreateTodoHandler', () => {
  let handler: CreateTodoHandler;
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
      CreateTodoHandler,
      repoProvider,
      publisherProvider,
    ];

    const metadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(metadata).compile();

    handler = testModule.get<CreateTodoHandler>(CreateTodoHandler);
    repo = testModule.get<TodoRepository>('TodoRepositoryImpl');
    publisher = testModule.get<EventPublisher>(EventPublisher);
  });

  describe('execute', () => {
    it('should execute CreateTodoCommand', async () => {
      repo.create = jest.fn().mockResolvedValue(undefined);
      publisher.mergeObjectContext = jest.fn().mockReturnValue({
        open: () => undefined,
        commit: () => undefined,
        created: () => undefined,
      });

      const command = new CreateTodoCommand('some title', 'some content');

      await expect(handler.execute(command)).resolves.toEqual(undefined);
    });
  });
});
