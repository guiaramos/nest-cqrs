import { Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoCreationSuccessEvent } from '../events/defs';

export class TodoSagas {
  @Saga()
  createTodoSaga(events$: Observable<any>) {
    return events$.pipe(
      ofType(TodoCreationSuccessEvent),
      map((event: TodoCreationSuccessEvent) => {
        Logger.verbose(`Todo with id ${event.todoId} was created`);
        // it should return a new command => Observable<ICommand>
      }),
    );
  }
}
