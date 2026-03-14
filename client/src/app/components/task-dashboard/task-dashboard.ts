import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-dashboard.html',
  styleUrls: ['./task-dashboard.css']
})
export class TaskDashboardComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';

  constructor(
    private taskService: TaskService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: () => this.toast.show('Failed to load tasks', 'error')
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.createTask({ title: this.newTaskTitle }).subscribe({
      next: (task) => {
        this.tasks.unshift(task);
        this.newTaskTitle = '';
        this.toast.show('Task added!', 'success');
      },
      error: () => this.toast.show('Could not add task', 'error')
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== id);
        this.toast.show('Task deleted', 'success');
      }
    });
  }
}