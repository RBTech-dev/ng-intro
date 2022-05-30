import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent, TodoDetailsComponent, TodoExistsGuard } from './todo';
import { TodoModule } from './todo/todo.module';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  // Catch all non specified routes and redirect to ''
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TodoModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
