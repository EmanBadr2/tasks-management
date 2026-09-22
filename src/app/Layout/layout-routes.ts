import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { ErrorState } from '../shared/components/error-state/error-state';
import { LoadingState } from '../shared/components/loading-state/loading-state';
import { EmptyState } from '../shared/components/empty-state/empty-state';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: MainLayout,

    children: [
      {
        path: '',
        redirectTo: 'Projects',
        pathMatch: 'full',
      },
      {
        path: 'Projects',
        loadComponent: () =>
          import('../features/projects/components/projects/projects').then((m) => m.Projects),
      },
 {
    path: 'error',
    component: ErrorState,
  },
  {
    path: 'loading',
    component: LoadingState,
  },
  {
    path: 'empty',
    component: EmptyState,
  },

    ],



  },


];
