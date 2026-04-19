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

  tasks: any[] = [];

  //  POPUP STATE
  showDeletePopup = false;
  selectedTask: any = null;

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {
    // AUTO REFRESH WHEN NAVIGATE
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  // DEFAULT DATA
  defaultTasks = [
    {
      id: 101,
      title: 'Design UI Layout',
      assignedTo: 'Aravindh',
      priority: 'High',
      dueDate: '20-04-2026',
      status: 'Completed'
    },
     {
      id: 102,
      title: 'Login Page Validation',
      assignedTo: 'Vicky',
      priority: 'High',
      dueDate: '22-04-2026',
      status: 'Completed'
    },
     {
      id: 103,
      title: 'API intergration',
      assignedTo: 'Keerthi',
      priority: 'High',
      dueDate: '22-04-2026',
      status: 'Completed'
    },

    {
      id: 104,
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

  //  NAVIGATE TO ADD TASK
  addTaskPage() {
    this.router.navigate(['/add-task']);
  }

  //  VIEW TASK
  viewTask(task: any) {
    this.router.navigate(['/task', task.id]);
  }

  //  OPEN DELETE POPUP
  deleteTask(task: any) {
    this.selectedTask = task;
    this.showDeletePopup = true;
  }

  //  CONFIRM DELETE
  confirmDelete() {
    this.tasks = this.tasks.filter(
      (t: any) => t.id !== this.selectedTask.id
    );

    this.taskService.saveTasks(this.tasks);

    this.showDeletePopup = false;
    this.selectedTask = null;
  }

  //  CANCEL DELETE
  cancelDelete() {
    this.showDeletePopup = false;
    this.selectedTask = null;
  }
}