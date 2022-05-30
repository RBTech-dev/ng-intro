import { Component, OnInit } from '@angular/core';
import { TodoFacade } from '../../services';

@Component({
  selector: 'app-todo-details',
  template: `
    <ng-container *ngIf="todoFacade.todo$ | async as todo; else loading">
      <mat-toolbar>
        <button
          mat-icon-button
          matTooltip="Go back to list"
          matTooltipPosition="above"
          color="primary"
          [routerLink]="['/']"
        >
          <mat-icon aria-label="Go back to list icon">arrow_back</mat-icon>
        </button>

        Todo '{{ todo.id }}' details
      </mat-toolbar>

      <mat-card>
        <mat-card-content>
          <app-todo class="no-go-to-details" [todo]="todo" [readonly]="true"></app-todo>
        </mat-card-content>
      </mat-card>
    </ng-container>

    <ng-template #loading>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
  styles: [],
})
export class TodoDetailsComponent {
  public readonly todo$ = '';
  constructor(public todoFacade: TodoFacade) {}
}
