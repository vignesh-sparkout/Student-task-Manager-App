import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  constructor(private router: Router) {}

  showForm = false;

  newTask: any = {
    id: 0,
    title: '',
    description: '',
    assignedTo: '',
    priority: '',
    dueDate: '',
    status: 'Pending'
  };

  // 🔹 FINAL TASK LIST (STATIC + LOCAL)
  tasks: any[] = [];

  // 🔹 4 DEFAULT TASKS (ONLY ON FIRST LOAD)
  defaultTasks = [
    {
      id: 101,
      title: 'Design UI Layout',
      assignedTo: 'Arun',
      priority: 'High',
      dueDate: '2026-04-20',
      status: 'Completed'
    },
    {
      id: 102,
      title: 'Fix Routing Issue',
      assignedTo: 'Tamil',
      priority: 'Medium',
      dueDate: '2026-04-18',
      status: 'Pending'
    },
    {
      id: 103,
      title: 'API Integration',
      assignedTo: 'Kumar',
      priority: 'High',
      dueDate: '2026-04-22',
      status: 'Pending'
    },
    {
      id: 104,
      title: 'Dashboard UI',
      assignedTo: 'Kishore',
      priority: 'Low',
      dueDate: '2026-04-25',
      status: 'Completed'
    }
  ];

  ngOnInit() {
    const saved = localStorage.getItem('tasks');

    if (saved) {
      this.tasks = JSON.parse(saved);
    } else {
      this.tasks = this.defaultTasks;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  openForm() {
    this.showForm = true;
  }

  addTask(form: any) {
    if (form.invalid) return;

    this.newTask.id = Date.now();

    this.tasks.push({ ...this.newTask });

    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      assignedTo: '',
      priority: '',
      dueDate: '',
      status: 'Pending'
    };

    this.showForm = false;
  }

  viewTask(task: any) {
    this.router.navigate(['/task', task.id]);
  }

  markComplete(task: any) {
    task.status = 'Completed';
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(task: any) {
    this.tasks = this.tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}