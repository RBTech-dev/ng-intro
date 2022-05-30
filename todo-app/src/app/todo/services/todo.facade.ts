import { Inject, Injectable } from '@angular/core';
import { TodoItemModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay, take, tap } from 'rxjs';
import { EndpointService } from '../../shared';
import { TodoEndpointService } from './todo-endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade {
  // Used to set and get todo list
  private readonly todoListSubject = new BehaviorSubject<undefined | TodoItemModel[]>(undefined);
  public readonly todoList$ = this.todoListSubject.asObservable();

  // Used to set and get actual todo
  private readonly todoSubject = new BehaviorSubject<undefined | TodoItemModel>(undefined);
  public readonly todo$ = this.todoSubject.asObservable();

  constructor(private todoEndpointService: TodoEndpointService, private endpointService: EndpointService) {}

  getTodoList(): Observable<TodoItemModel[]> {
    return this.todoEndpointService.getTodoList().pipe(tap((todo) => this.todoListSubject.next(todo)));
  }

  getTodoById(todoId: TodoItemModel['id']): Observable<TodoItemModel> {
    return this.todoEndpointService.getTodoById(todoId).pipe(tap((todo) => this.todoSubject.next(todo)));
  }

  addTodo(todo: Omit<TodoItemModel, 'id'>) {
    return this.todoEndpointService.addTodo(todo);
  }

  updateTodo(todo: TodoItemModel) {
    return this.todoEndpointService.updateTodo(todo);
  }

  deleteTodo(todoId: TodoItemModel['id']) {
    return this.todoEndpointService.deleteTodo(todoId);
  }
}
