import { Component } from '@angular/core';
import { AuthService } from '../service/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  constructor(private auth: AuthService) {}

  tasks = [
    { title: 'Task 1', completed: true },
    { title: 'Task 2', completed: false },
    { title: 'Task 3', completed: true },
    { title: 'Task 4', completed: false }
  ];

  get totalTasks(){
      return this.tasks.length;
  }
  get completedTasks(){
    return this.tasks.filter(t => t.completed). length;
  }
  get pendingTasks(){
    return this.tasks.filter(t => !t.completed).length;
  }

  markComplete(task: any) {
  task.status = 'Completed';
}

deleteTask(task: any) {
  this.tasks = this.tasks.filter(t => t !== task);
}

  logout() {
    this.auth.logout();
  }
}