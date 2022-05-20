import { Component, OnInit } from '@angular/core';
import { remove } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import {
  Database,
  set,
  ref,
  update,
  getDatabase,
  onValue,
} from 'firebase/database';
import { environment } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  values: any[] = [];
  check: any[] = [];
  app = initializeApp(environment.firebase);
  db = getDatabase();
  todoInput: any;
  today = new Date();
  date =
    this.today.getFullYear() +
    '-' +
    (this.today.getMonth() + 1) +
    '-' +
    this.today.getDate();
  constructor() {}

  ngOnInit(): void {
    this.getTodo();
  }

  addTodo(value: any) {
    if (value.todo == undefined || value.todo == null) {
      alertify.error('Input field is can not be empty');
      return;
    }

    set(ref(this.db, 'todo/' + value.todo), {
      todo: value.todo,
      id: this.values.length,
      date: this.date,
    });
    this.getTodo();
    this.todoInput = '';
  }
  getTodo() {
    const db = getDatabase();
    const starCountRef = ref(db, 'todo');
    onValue(starCountRef, (snapshot) => {
      const data = [snapshot.val()];
      if (data !== undefined && data !== null && data[0] !== null) {
        Object.entries(data[0]).forEach((key) => {
          if (!this.check.includes(key[0])) {
            this.check.push(key[0]);
            this.values.push(key[1]);
          }
        });
      }
    });
  }
  deleteTodo = (i: number, item: any) => {
    const db = getDatabase();
    const userRef = ref(db, 'todo');
    this.values.splice(i, 1);
    remove(ref(db, 'todo/' + item));
    this.getTodo();
  };
}
