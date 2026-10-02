import { Routes } from '@angular/router';

export const ProjectsRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/projects/projects').then((m) => m.Projects),
  },

  {
    path: 'list',
    loadComponent: () =>
      import('./components/projects-list/projects-list').then((m) => m.ProjectsList),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-edit-projects/add-edit-projects').then((m) => m.AddEditProjects),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/add-edit-projects/add-edit-projects').then((m) => m.AddEditProjects),
  },

  {
    path: ':id/epics',

    loadComponent: () => import('../Epics/epics/epics').then((m) => m.Epics),
  },
    {
    path: ':id/epics/new',

    loadComponent: () => import('../../features/Epics/epics/components/add-epic/add-epic').then((m) => m.AddEpic),
  },
  {
    path: ':id/members',
    loadComponent: () =>
      import('./components/project-members/project-members').then((m) => m.ProjectMembers),
  },



];
