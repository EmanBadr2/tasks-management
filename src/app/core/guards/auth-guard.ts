import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  const access_token = localStorage.getItem('access_token')
  if(access_token){
    //  router.createUrlTree(['/MainLayout'])
     return true;
  }
  return router.createUrlTree(['/auth'])
};
