import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'MainLayout',
    pathMatch: 'full',
  },

    {
    path: 'auth',
  loadChildren: () =>
      import('./features/auth/auth.routing').then(
        m => m.AuthRoutes
      ),
  },

    {
    path: 'MainLayout',
    canActivate : [authGuard] ,
  loadChildren: () =>
      import( './Layout/layout-routes').then(
        m => m.LayoutRoutes
      )
  },



];
