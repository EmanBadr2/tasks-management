import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.scss',
  templateUrl: './toast.html',
})
export class Toast {
  toastService = inject(ToastService)
 



}
