// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; 
// import { TaskService } from '../../services/task';
// import { ToastService } from '../../services/toast';

// @Component({
//   selector: 'app-task-dashboard',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './task-dashboard.html',
//   styleUrls: ['./task-dashboard.css']
// })

// export class TaskDashboardComponent implements OnInit {
//   tasks: any[] = [];
//   filteredTasks: any[] = [];
//   newTaskTitle: string = '';
//   currentFilter: 'all' | 'active' | 'completed' = 'all';
//   isLoading: boolean = true;

//   today: Date = new Date();

//   constructor(private taskService: TaskService, private toast: ToastService) {}

//   getCompletedCount(): number {
//     return this.tasks.filter(t => t.completed).length;
//   }

//   ngOnInit() {
//     this.loadTasks(); 
//   }

//   loadTasks() {
//     this.isLoading = true;
//     this.taskService.getTasks().subscribe({
//       next: (res: any) => {
//         const data = res.data?.tasks || res.tasks || res.data || res;
//         this.tasks = Array.isArray(data) ? data : [];
//         this.applyFilter();
//         this.isLoading = false;
//       },
//       error: () => {
//         this.toast.show('Failed to sync tasks', 'error');
//         this.isLoading = false;
//       }
//     });
//   }

//   applyFilter(filter?: 'all' | 'active' | 'completed') {
//     if (filter) this.currentFilter = filter;
    
//     if (this.currentFilter === 'active') {
//       this.filteredTasks = this.tasks.filter(t => !t.completed);
//     } else if (this.currentFilter === 'completed') {
//       this.filteredTasks = this.tasks.filter(t => t.completed);
//     } else {
//       this.filteredTasks = [...this.tasks];
//     }
//   }

//   addTask() {
//     if (!this.newTaskTitle.trim()) return;
//     this.taskService.createTask(this.newTaskTitle).subscribe({
//       next: (res: any) => {
//         const newTask = res.data?.task || res.task || res.data || res;
//         this.tasks.unshift(newTask);
//         this.applyFilter();
//         this.newTaskTitle = '';
//         this.toast.show('Task captured', 'success');
//       }
//     });
//   }

//   toggleTask(task: any) {
//     const originalStatus = task.completed;
//     task.completed = !task.completed; 
    
//     this.taskService.updateTask(task._id, { completed: task.completed }).subscribe({
//       next: () => {
//         this.applyFilter();
//         this.toast.show(task.completed ? 'Goal achieved!' : 'Task reopened', 'success');
//       },
//       error: () => {
//         task.completed = originalStatus;
//         this.toast.show('Sync failed', 'error');
//       }
//     });
//   }

//   deleteTask(id: string) {
//     this.taskService.deleteTask(id).subscribe({
//       next: () => {
//         this.tasks = this.tasks.filter(t => t._id !== id);
//         this.applyFilter();
//         this.toast.show('Task deleted', 'success');
//       }
//     });
//   }
// }


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
  filteredTasks: any[] = [];
  newTaskTitle: string = '';
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  isLoading: boolean = true;
  isAdding: boolean = false;
  today: Date = new Date();

  constructor(private taskService: TaskService, private toast: ToastService) {}

  ngOnInit() {
    this.loadTasks(); 
  }

  getCompletedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        const data = res.data?.tasks || res.tasks || res.data || res;
        this.tasks = Array.isArray(data) ? data : [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.toast.show('Failed to sync tasks', 'error');
        this.isLoading = false;
      }
    });
  }

  applyFilter(filter?: 'all' | 'active' | 'completed') {
    if (filter) this.currentFilter = filter;
    if (this.currentFilter === 'active') {
      this.filteredTasks = this.tasks.filter(t => !t.completed);
    } else if (this.currentFilter === 'completed') {
      this.filteredTasks = this.tasks.filter(t => t.completed);
    } else {
      this.filteredTasks = [...this.tasks];
    }
  }

  addTask() {
    if (!this.newTaskTitle.trim() || this.isAdding) return;
    this.isAdding = true;
    this.taskService.createTask(this.newTaskTitle).subscribe({
      next: (res: any) => {
        const newTask = res.data?.task || res.task || res.data || res;
        this.tasks.unshift(newTask);
        this.applyFilter();
        this.newTaskTitle = '';
        this.isAdding = false;
        this.toast.show('Task captured', 'success');
      },
      error: () => {
        this.isAdding = false;
        this.toast.show('Failed to add task', 'error');
      }
    });
  }

  toggleTask(task: any) {
    const originalStatus = task.completed;
    task.completed = !task.completed; 
    this.taskService.updateTask(task._id, { completed: task.completed }).subscribe({
      next: () => {
        this.applyFilter();
        this.toast.show(task.completed ? 'Goal achieved!' : 'Task reopened', 'success');
      },
      error: () => {
        task.completed = originalStatus;
        this.toast.show('Sync failed', 'error');
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== id);
        this.applyFilter();
        this.toast.show('Task deleted', 'success');
      }
    });
  }
}