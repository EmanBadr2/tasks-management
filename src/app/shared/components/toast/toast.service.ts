import { Injectable, signal } from '@angular/core';
import { Toast } from './toast';
import { ToastType } from './toast.model';


@Injectable({
  providedIn: 'root'
})
export class ToastService {



 readonly toasts =signal<Toast[]>([]) ;

  message = signal('');
  type = signal<ToastType>('success');
 visible = signal(false);


  private show( message: string, type:ToastType ): void {
  
   this.message.set(message);
    this.type.set(type);
    this.visible.set(true);
   
    setTimeout(() => {
      // this.toasts.set([]);
      // this.visible.set(false);
      this.hide()
    }, 3000);

 }  
   hide() {
    this.visible.set(false);
  }
  success(message: string): void { this.show(message, 'success'); }

  error(message: string ): void {this.show(message, 'error');}

  warning(message: string): void { this.show(message, 'warning'); }

  info(message: string): void {this.show(message, 'info'); }


}
