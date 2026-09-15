import { Routes } from '@angular/router';


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
  loadChildren: () =>
      import( './Layout/layout-routes').then(
        m => m.LayoutRoutes
      )
  },



];
