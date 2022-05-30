import { Component, OnInit } from '@angular/core';
import { TodoFacade } from '../../services';
import { Router } from '@angular/router';
import { TodoItemModel } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTodoComponent } from '../../components';

@Component({
  selector: 'app-todo-list',
  template: `
    <mat-toolbar color="primary">
      <span>♾️ Todo app</span>
    </mat-toolbar>

    <ng-container *ngIf="todoFacade.todoList$ | async as todoList">
      <mat-card>
        <mat-card-title>My awesome todo list</mat-card-title>

        <mat-card-content>
          <mat-list *ngIf="todoList.length; else noTodoInList">
            <mat-list-item *ngFor="let todo of todoList; let last = last">
              <app-todo
                class="todo"
                [todo]="todo"
                (delete)="deleteTodo(todo)"
                (toggleDone)="toggleDoneTodo(todo)"
                (goToTodoDetails)="router.navigate(['/todo', todo.id])"
              ></app-todo>
              <mat-divider *ngIf="!last"></mat-divider>
            </mat-list-item>
          </mat-list>
        </mat-card-content>

        <mat-divider inset></mat-divider>

        <mat-card-actions align="end">
          <button mat-raised-button color="primary" (click)="addTodoDialog()">Add new Todo</button>
        </mat-card-actions>
      </mat-card>
    </ng-container>

    <ng-template #noTodoInList>
      <p>All done! 🎉</p>
    </ng-template>
  `,
  styles: [
    `
      .todo {
        width: 100%;
      }
    `,
  ],
})
export class TodoListComponent implements OnInit {
  constructor(
    public todoFacade: TodoFacade,
    private snackbar: MatSnackBar,
    public router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updateTodoList();
  }

  deleteTodo(todo: TodoItemModel) {
    return this.todoFacade.deleteTodo(todo.id).subscribe({
      complete: () => {
        this.snackbar.open('Todo deleted.');
        this.updateTodoList();
      },
      error: () => {
        this.snackbar.open('Unable to delete todo.');
      },
    });
  }

  toggleDoneTodo(updatedTodo: TodoItemModel) {
    return this.todoFacade.updateTodo(updatedTodo).subscribe({
      complete: () => {
        this.snackbar.open('Todo updated.');
        this.updateTodoList();
      },
      error: () => {
        this.snackbar.open('Unable to update todo.');
      },
    });
  }

  addTodoDialog(): void {
    const dialogRef = this.dialog.open(DialogAddTodoComponent, {
      width: '300px',
      data: { description: '' } as Pick<TodoItemModel, 'description'>,
    });

    dialogRef.afterClosed().subscribe((todo: Pick<TodoItemModel, 'description'> | undefined) => {
      if (todo) {
        this.todoFacade.addTodo(todo).subscribe({
          complete: () => {
            this.snackbar.open('Todo created.');
            this.updateTodoList();
          },
          error: () => {
            this.snackbar.open('Unable to create todo.');
          },
        });
      }
    });
  }

  private updateTodoList() {
    this.todoFacade.getTodoList().subscribe();
  }
}
