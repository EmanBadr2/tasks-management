import { Component,  inject,  signal } from '@angular/core';
import { Auth } from '../../services/services/auth';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../models/LoginRequest';
import { email, required, form  } from '@angular/forms/signals';
import { ReusableInput } from '../../../../shared/components/reusable-input/reusable-input';
import { Footer } from '../../components/footer/footer';
@Component({
  imports: [ReusableInput, RouterLink, Footer],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {

   authService=inject(Auth)
  router = inject(Router);

  LoginModel = signal<LoginRequest>({
  email:'',
  password :''
})


LoginForm = form(this.LoginModel ,(schemaPath)=>{
  required(schemaPath.email , { message: 'Email is required' })
  required(schemaPath.password ,{message: 'Password is required'})
  email(schemaPath.email , { message: 'Enter a valid email address' })
} )


login(event:Event){
  event.preventDefault();
  if(this.LoginForm().invalid()){
    return;
  }
  this.authService.login(this.LoginModel()).subscribe({
            next:(res  )=>{
       console.log( res);
      this.LoginForm().reset();
      // localStorage.setItem( `access_token` ,res?.access_token? )
      // localStorage.setItem( `refresh_token` ,res.refresh_token )
      // localStorage.setItem( `userId` ,res.user.id )

    //  this.router.navigate(['project']);
    } ,
    error:(err)=>{
        console.log('STATUS:', err.status);
       console.log('err:', err.error);
    } 

  })
  

}

}
