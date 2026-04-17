import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  constructor(private router: Router, private taskService: TaskService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tasks = this.taskService.getTasks();
      }
    });

  }

  tasks: any[] = [];

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
    }
  ];

  ngOnInit() {
    const saved = this.taskService.getTasks();

    if (saved.length > 0) {
      this.tasks = saved;
    } else {
      this.tasks = this.defaultTasks;
      this.taskService.saveTasks(this.tasks);
    }
  }

  addTaskPage() {
    this.router.navigate(['/add-task']);
  }

  viewTask(task: any) {
    this.router.navigate(['/task', task.id]);
  }

  deleteTask(task: any) {
    this.tasks = this.tasks.filter((t: any) => t.id !== task.id);
    this.taskService.saveTasks(this.tasks);
  }
}