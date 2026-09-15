import { Routes,  } from '@angular/router';
import { LayOutComponent } from './pages/layOut/layOut.component';

export const AuthRoutes : Routes = [
  {
    path: '',
    component: LayOutComponent,
    children: [
      {
        path : '',
        redirectTo: 'login'  ,
         pathMatch: 'full',
      },

  { path : 'login' , loadComponent : () =>
      import('./pages/login/login').then(
        m => m.Login
      ),
   },


   { path : 'register' , loadComponent : () =>
      import('./pages/register/register').then(
        m => m.Register
      ),
   },

      { path : 'forgotPassword' , loadComponent : () =>
      import('./components/forgot-password/forgot-password').then(
        m => m.ForgotPassword
      ),
   },


     ]
   } ,
  

];

// export const AuthRoutes = RouterModule.forChild(routes);
