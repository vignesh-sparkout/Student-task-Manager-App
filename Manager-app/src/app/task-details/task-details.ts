import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.html',
  styleUrls: ['./task-details.css']
})
export class TaskDetailComponent {

  taskId: any;
  isEdit = false;

  task: any = {
    id: '',
    title: '',
    assignedTo: '',
    priority: '',
    dueDate: '',
    status: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.taskId = this.route.snapshot.paramMap.get('id');

    // Fake data (later replace with service)
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const found = tasks.find((t: any) => t.id == this.taskId);

    if (found) {
      this.task = { ...found };
    }
  }

  enableEdit() {
    this.isEdit = true;
  }

  saveTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks = tasks.map((t: any) =>
      t.id == this.task.id ? this.task : t
    );

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.isEdit = false;
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}