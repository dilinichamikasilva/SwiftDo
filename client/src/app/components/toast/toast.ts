import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toastService.toast$ | async as toast" 
         class="toast-box" 
         [ngClass]="toast.type">
      {{ toast.text }}
    </div>
  `,
  styleUrls: ['./toast.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}