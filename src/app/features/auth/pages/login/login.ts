import { Component,  inject,  signal } from '@angular/core';
import { Auth } from '../../services/services/auth';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../models/LoginRequest';
import { email, required, form, pattern  } from '@angular/forms/signals';
import { ReusableInput } from '../../../../shared/components/reusable-input/reusable-input';
import { Footer } from '../../components/footer/footer';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  imports: [ReusableInput, RouterLink, Footer],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
 toast = inject(ToastService);
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
  pattern(schemaPath.password ,/^\S+$/
    , {message: 'Password must not contain spaces'}
  )
})


login(event:Event){
  event.preventDefault();
  if(this.LoginForm().invalid()){
    return;
  }

  this.authService.login(this.LoginModel()).subscribe({
            next:(res :any  )=>{
       console.log( res);
      this.LoginForm().reset();
      localStorage.setItem( `access_token` ,res.access_token )
      localStorage.setItem( `refresh_token` ,res.refresh_token )
      localStorage.setItem( `userId` ,res.user.id )
      this.toast.success(' success Login')
       this.router.navigate(['MainLayout']); 

    } ,
    error:(err)=>{
       console.log('STATUS:', err.status);
       console.log('err:', err.error);
       console.log(err.msg);
       
       this.toast.error(err.error.msg)
    }

  })


}

}
