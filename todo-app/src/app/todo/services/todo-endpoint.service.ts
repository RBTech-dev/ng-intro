import { Inject, Injectable } from '@angular/core';
import { TodoItemModel } from '../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { EndpointService } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class TodoEndpointService {
  private readonly todoResource = `${this.endpointService.get()}/todo`;

  constructor(private httpClient: HttpClient, private endpointService: EndpointService) {}

  getTodoList(): Observable<TodoItemModel[]> {
    return this.httpClient.get<TodoItemModel[]>(this.todoResource);
  }

  getTodoById(todoId: TodoItemModel['id']): Observable<TodoItemModel> {
    return this.httpClient.get<TodoItemModel>(`${this.todoResource}/${todoId}`);
  }

  updateTodo(todo: TodoItemModel): Observable<TodoItemModel> {
    return this.httpClient.put<TodoItemModel>(`${this.todoResource}/${todo.id}`, todo);
  }

  addTodo(todo: Omit<TodoItemModel, 'id'>): Observable<TodoItemModel> {
    return this.httpClient.post<TodoItemModel>(this.todoResource, todo);
  }

  deleteTodo(todoId: TodoItemModel['id']): Observable<void> {
    return this.httpClient.delete<void>(`${this.todoResource}/${todoId}`);
  }
}
