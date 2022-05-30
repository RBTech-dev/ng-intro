import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TodoItemModel } from '../../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo: TodoItemModel | null = null;
  @Input() readonly = false;
  @Output() toggleDone = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<void>();
  @Output() goToTodoDetails = new EventEmitter<void>();
}
