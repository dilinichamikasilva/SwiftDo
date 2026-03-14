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
    next: (res: any) => {
      console.log('Backend Response:', res); 
      
      if (res && res.data && Array.isArray(res.data.tasks)) {
        this.tasks = res.data.tasks;
      } else if (res && Array.isArray(res.tasks)) {
        this.tasks = res.tasks;
      } else if (res && Array.isArray(res.data)) {
        this.tasks = res.data;
      } else if (Array.isArray(res)) {
        this.tasks = res;
      } else {
        this.tasks = [];
        console.error('Could not find tasks array in response');
      }
    },
    error: (err) => {
      this.toast.show('Error loading tasks', 'error');
      console.error(err);
    }
  });
}

  addTask() {
  if (!this.newTaskTitle.trim()) return;

  this.taskService.createTask(this.newTaskTitle).subscribe({
    next: (res: any) => {
      console.log('Add Task Response:', res); 

      let newTask;

      if (res && res.data && res.data.task) {
        newTask = res.data.task;
      } else if (res && res.task) {
        newTask = res.task;
      } else if (res && res.data) {
        newTask = res.data;
      } else {
        newTask = res;
      }

      if (newTask && newTask.title) {
        this.tasks.unshift(newTask); 
        this.newTaskTitle = ''; 
        this.toast.show('Task added!', 'success');
      } else {
        this.toast.show('Received invalid task data', 'error');
      }
    },
    error: (err) => {
      this.toast.show(err.error?.message || 'Failed to add task', 'error');
    }
  });
}
}