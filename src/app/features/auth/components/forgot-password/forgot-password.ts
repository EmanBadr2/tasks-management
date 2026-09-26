import { Component,  computed,  inject,  OnInit,  signal } from '@angular/core';
import { Auth } from '../../services/services/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { email, form, required, FormField } from '@angular/forms/signals';
import { forgetReq } from '../../models/resetPass';
import { finalize } from 'rxjs';


@Component({
  imports: [RouterLink, FormField],
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.scss',
  templateUrl: './forgot-password.html',
})

export class ForgotPassword  implements OnInit{
  ngOnInit(): void {
    console.log(this.router.url);

  }

   toast = inject(ToastService);
   authService=inject(Auth)
  router = inject(Router);

  isLoading = signal(false);
isSuccess = signal(false);
 remainingSeconds = signal(0);
 resendCount = signal(0);
maxResend = 3;
canResend=computed(()=>
  this.remainingSeconds() === 0 && this.resendCount() <3
)


  forgetPassModel=signal<forgetReq>({
    email:''
  })
  forgetPassForm= form(this.forgetPassModel ,(Path)=>{
   required(Path.email , { message: 'Email is required' } )
  email(Path.email , { message: 'Enter a valid email address' })
})

sendResetLink(event:Event){
  event.preventDefault();
  if(this.forgetPassForm().invalid()|| this.isLoading()){
    return;
  }
  this.isLoading.set(true)
  this.authService.forgotPassword(this.forgetPassModel()).pipe(
    finalize(() => {
       this.isLoading.set(false);
       this.toast.success('If an account exists with this email, we’ve sent a password reset link.')
    }),

  ).subscribe({
      next: () => {
        this.resendCount.update(count => count + 1);
         this.startResendTimer();
        this.isSuccess.set(true);
        this.forgetPassModel.set({ email:''  })
        this.forgetPassForm().reset()
      },
          error: () => {
        this.toast.error('Something went wrong. Please try again.' )

      },


  })



}


startResendTimer(): void {   //countDown
  this.isLoading.set(true)
  this.remainingSeconds.set(300); //5m
    const timer = setInterval(() => {
    this.remainingSeconds.update(seconds => {
      if (seconds <= 1) {
        clearInterval(timer);
        this.toast.info(`Don't Receive An Email? Resend`)
        this.isLoading.set(false)
        return 0;
      }

      return seconds - 1;
    });
  }, 1000);
}

timeLeft = computed(() => {   //Time 00:00 to show in temp
  const minutes = Math.floor(this.remainingSeconds() / 60);
  const seconds = this.remainingSeconds() % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
});

}
