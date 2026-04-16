import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {

  constructor (private router:Router){}
  viewTask(task: any) {
  this.router.navigate(['/task', task.id]);
}
  tasks = [
    {
      id: 1,
      title: 'Form Validation',
      assignedTo: 'Vignesh',
      priority: 'High',
      dueDate: '20-04-2026',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Build User Profile Page',
      assignedTo: 'Kishore',
      priority: 'Medium',
      dueDate: '18-04-2026',
      status: 'Completed'
    },

    {
      id: 3,
      title: 'Fix API Integration Bugs',
      assignedTo: 'Keerthi Vasan',
      priority: 'High',
      dueDate: '20-04-2026',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Create Sidebar Navigation',
      assignedTo: 'Iyyapan',
      priority: 'Medium',
      dueDate: '19-04-2026',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Fix Bugs',
      assignedTo: 'Gowtham',
      priority: 'Medium',
      dueDate: '23-04-2026',
      status: 'Pending'
    }

  ]
  markComplete(task: any) {
    task.status = 'Completed';
  }

  deleteTask(task: any) {
    this.tasks = this.tasks.filter(t => t !== task);
  }
}

