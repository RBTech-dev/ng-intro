import { NgModule } from '@angular/core';
import { TodoDetailsComponent, TodoListComponent } from './containers';
import { TodoEndpointService, TodoFacade } from './services';
import { SharedModule } from '../shared';
import { DialogAddTodoComponent, TodoComponent } from './components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TodoExistsGuard } from './guards';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { A11yModule } from '@angular/cdk/a11y';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [TodoListComponent, TodoComponent, TodoDetailsComponent, DialogAddTodoComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'todo/:id',
        canActivate: [TodoExistsGuard],
        component: TodoDetailsComponent,
      },
    ]),
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    A11yModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  exports: [TodoListComponent, TodoComponent, TodoDetailsComponent],
  providers: [TodoFacade, TodoEndpointService],
})
export class TodoModule {}
