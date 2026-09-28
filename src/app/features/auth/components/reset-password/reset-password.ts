import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/services/auth';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { createPasswordValidation, passwordSchema  } from '../../validators/custom-validators';
import { ResetModel } from '../../models/resetPass';
import { form, FormField } from '@angular/forms/signals';
 
@Component({
  imports: [RouterLink, FormField],
  selector: 'app-reset-password',
  styleUrl: './reset-password.scss',
  templateUrl: './reset-password.html',
})

export class ResetPassword implements OnInit {
  route= inject( ActivatedRoute) ;
  router= inject( Router) ;
  authService= inject( Auth) ;
  toast = inject(ToastService);
done=signal(false)

  ngOnInit(): void {
    console.log(this.router.url);
      // console.log( this.route.snapshot.queryParamMap.get('token'));
      this.extractTokenFromUrl()

  }


// ------

passwordValue = computed( ()=> this.resetModel().password)
passwordValidation = createPasswordValidation( this.passwordValue)
passwordCheckedStats=this.passwordValidation.passwordCheckedStatsG5
passwordValid =this.passwordValidation.passwordValid
resetModel=signal<ResetModel>({
  password : '' ,
  confirmPassword :''
})
resetForm =form(this.resetModel , (path)=>{
  passwordSchema(path.password , path.confirmPassword) 
})


submit(){
    if (this.resetForm().invalid()) {
      return;
    }

const { confirmPassword, ...payload } = this.resetForm().value();
console.log(confirmPassword);
console.log(payload);  //send payload to api


}

   private extractTokenFromUrl(): void {
   console.log(this.route.snapshot.fragment);
   }

}
