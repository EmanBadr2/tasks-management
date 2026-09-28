import { Component, computed, inject,  signal } from '@angular/core';
import { Auth } from '../../services/services/auth';
import { RegisterRequest } from '../../models/RegisterRequest';
import {  form, maxLength, minLength, pattern, required } from   '@angular/forms/signals';
import { ReusableInput } from "../../../../shared/components/reusable-input/reusable-input";
import { Router, } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { emailValidation } from '../../validators/custom-validators';
import { createPasswordValidation, passwordSchema  } from '../../validators/custom-validators';
import { ToastService } from '../../../../shared/components/toast/toast.service';


@Component({
  imports: [ ReusableInput, Footer ],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
 authService=inject(Auth)
  router = inject(Router);
  toaster=inject(ToastService)

 registerModel = signal<RegisterRequest>({
   email: '',
   password: '',
   data:{
      name: '',
    job_title: ''
   } ,
   confirmPassword :''
 })


registerForm = form(this.registerModel , (path)=>{

  required(path.data.name , { message: 'Name is required' })
    minLength(path.data.name, 3, { message: '3-50 characters, letters only.' });
    maxLength(path.data.name, 50, { message: '3-50 characters, letters only.' });
  pattern(path.data.name , /^[A-Za-z\s]+$/ ,{ message: '3-50 characters, letters only.' })

emailValidation(path.email);
passwordSchema(path.password , path.confirmPassword)


})


passwordValue = computed( ()=> this.registerModel().password)
passwordValidation = createPasswordValidation( this.passwordValue)
passwordValid =this.passwordValidation.passwordValid
passwordCheckedStats=this.passwordValidation.passwordCheckedStatsG3


signUp(event:Event){
event.preventDefault();
  if (this.registerForm().invalid()) {
      return;
    }
const { confirmPassword, ...payload } = this.registerForm().value();
console.log(confirmPassword);
    this.authService.signUp(payload).subscribe({
        next:(res)=>{
       console.log( res);
      this.registerForm().reset();
      this.toaster.success('you create it successfully ')
     this.router.navigate(['/auth/login']);
    } ,
    error:(err)=>{
        console.log('STATUS:', err.status);
       console.log('err:', err.error);
       this.toaster.error('Some Thing Error')
    }

    })


}
}
