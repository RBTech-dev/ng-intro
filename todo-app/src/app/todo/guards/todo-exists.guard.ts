import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { TodoFacade } from '../services';

@Injectable({
  providedIn: 'root',
})
export class TodoExistsGuard implements CanActivate {
  constructor(private todoService: TodoFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const todoId = +route.params['id'];
    if (isNaN(todoId)) {
      return false;
    }

    return this.todoService.getTodoById(todoId).pipe(
      map((todo) => !!todo),
      catchError((err) => {
        // todo you should say something to user
        return of(false);
      })
    );
  }
}
