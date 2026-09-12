import { Component, computed, inject,  signal } from '@angular/core';
import { Auth } from '../../services/services/auth';
import { RegisterRequest } from '../../models/RegisterRequest';
import { email, form, maxLength, minLength, pattern, required, validate } from   '@angular/forms/signals';
import { ReusableInput } from "../../../../shared/components/reusable-input/reusable-input";
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';


@Component({
  imports: [RouterLink, ReusableInput, Footer],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
 authService=inject(Auth)
  router = inject(Router);

 registerModel = signal<RegisterRequest>({
   email: '',
   password: '',
   data:{
      name: '',
    job_title: ''
   } ,
   confirmPassword :''
 })


registerForm = form(this.registerModel , (schemaPath)=>{

  required(schemaPath.data.name , { message: 'Name is required' })
    minLength(schemaPath.data.name, 3, { message: '3-50 characters, letters only.' });
    maxLength(schemaPath.data.name, 50, { message: '3-50 characters, letters only.' });
  pattern(schemaPath.data.name , /^[A-Za-z\s]+$/ ,{ message: '3-50 characters, letters only.' })


  required(schemaPath.email , { message: 'Email is required' })
  email(schemaPath.email , { message: 'Enter a valid email address' })


  required(schemaPath.password , { message: 'Password is required' })
  minLength( schemaPath.password , 8 ,  { message: 'Password must be at least 8 characters' })
  maxLength( schemaPath.password , 64 ,  { message: 'Password must be between 8 -64 characters' })
  required(schemaPath.confirmPassword , { message: ' must confirm Password ' })

 validate( schemaPath.confirmPassword , ({value , valueOf})=>{
  if(value()!== valueOf(schemaPath.password)  ){
    return {
      kind : 'PasswordMisMatch' ,
      message : 'password not Match'
    }
  }
  return null ;
 
 })

})

passwordValue = computed( ()=> this.registerModel().password)
hasMinLength =computed<boolean>( ()=> this.passwordValue().length > 8 )
hasMixedCase = computed<boolean>( ()=>
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])\S*$/.test(this.passwordValue()) 
)
hasOneSpecialChar = computed<boolean>( ()=>
/[!@#$%^&*]/.test(this.passwordValue())
)
passwordValid = computed<boolean>( ()=> 
  this.hasMinLength()
 && this.hasOneSpecialChar()  
&& this.hasMixedCase()
)
passwordCheckedStats = computed( ()=> 
[ 
  {label:  ' One uppercase, lowercase, and digit' , inCase : this.hasMixedCase() } ,
  {label: 'At least 8 characters' , inCase : this.hasMinLength() } ,
  {label: 'One special character' , inCase : this.hasOneSpecialChar() } ,

]
)


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
     this.router.navigate(['/auth/login']);
    } ,
    error:(err)=>{
        console.log('STATUS:', err.status);
       console.log('err:', err.error);
    } 

    })


}
}
