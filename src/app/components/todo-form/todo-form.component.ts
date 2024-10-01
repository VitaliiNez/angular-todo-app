import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  @Output() save = new EventEmitter<string>();

  todoForm = new FormGroup({
    title: new FormControl('', {
      validators: [(Validators.required, Validators.minLength(3))],
      nonNullable: true,
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  handleFormSubmitTodo() {
    if (this.title.invalid) {
      return;
    }
    this.save.emit(this.title.value);
    this.todoForm.reset();
  }
}
