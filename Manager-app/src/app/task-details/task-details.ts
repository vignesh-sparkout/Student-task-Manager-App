import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-details.html',
  styleUrls: ['./task-details.css']
})
export class TaskDetailComponent {

  taskId: number = 0;
  isEdit = false;
  isNewTask = false;

  task: any = {
    id: 0,
    title: '',
    description: '',
    assignedTo: '',
    priority: '',
    dueDate: '',
    status: 'Pending'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // EDIT MODE
      this.taskId = Number(id);

      const tasks = this.taskService.getTasks();
      const found = tasks.find((t: any) => t.id === this.taskId);

      if (found) {
        this.task = { ...found };
      }
    } else {
      //  ADD MODE
      this.isNewTask = true;
      this.isEdit = true;
    }
  }

  enableEdit() {
    this.isEdit = true;
  }

  saveTask() {
    let tasks = this.taskService.getTasks();

    if (this.isNewTask) {
      // ADD TASK
      this.task.id = Date.now();
      tasks.push(this.task);
    } else {
      //  UPDATE TASK
      tasks = tasks.map((t: any) =>
        t.id === this.task.id ? this.task : t
      );
    }

    this.taskService.saveTasks(tasks);
    this.router.navigate(['/tasks']);
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}