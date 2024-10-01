import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from './types/todo';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FilterActivePipe } from './pipes/filter-active.pipe';

const todos: Todo[] = [
  { id: 1, title: 'HTML + CSS', completed: true },
  { id: 2, title: 'JS', completed: false },
  { id: 3, title: 'REACT', completed: false },
  { id: 4, title: 'Vue.js', completed: false },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoComponent,
    TodoFormComponent,
    FilterActivePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todos: Todo[] = todos;

  handleTodoToggle(event: Event, todo: Todo) {
    todo.completed = (event.target as HTMLInputElement).checked;
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };

    this.todos = [...this.todos, newTodo];
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });
  }

  renameTodo(todoId: number, title: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    });
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }
}
