import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoItemModel } from '../../models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-todo',
  templateUrl: './dialog-add-todo.component.html',
})
export class DialogAddTodoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Pick<TodoItemModel, 'description'>
  ) {}
}
