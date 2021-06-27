import { TodoCompletedEvent, TodoCreatedEvent } from '../events';
import { Todo, TodoProperties, TodoStatus } from './todo.aggr';

describe('Todo Aggregate', () => {
  let properties: TodoProperties;
  let todo: Todo;

  beforeEach(() => {
    properties = {
      title: 'testTitle',
      content: 'testContent',
      _id: 'testId',
      status: TodoStatus.ON_GOING,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: new Date(),
    };
    todo = new Todo(properties);
  });

  describe('properties', () => {
    it('should return the properties', () => {
      const result = todo.properties;

      expect(result).toMatchObject(properties);
    });
  });

  describe('created', () => {
    it('should apply TodoCreatedEvent', () => {
      todo.created();

      const result = todo.getUncommittedEvents();

      expect(result).toEqual([Object.assign(new TodoCreatedEvent(), todo)]);
    });
  });

  describe('completed', () => {
    it('should apply TodoCompletedEvent', () => {
      todo.completed();

      const result = todo.getUncommittedEvents();

      expect(result).toEqual([Object.assign(new TodoCompletedEvent(), todo)]);
    });
  });
});
