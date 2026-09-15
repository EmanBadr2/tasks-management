import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const initialGuard: CanActivateFn = () => {

  const router = inject(Router)
  const access_token = localStorage.getItem('access_token')


  return   router.createUrlTree([access_token?  '/MainLayout' : '/auth']) 
    
};
