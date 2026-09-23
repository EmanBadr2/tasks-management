import { Routes } from '@angular/router';


export const ProjectsRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/projects/projects').then(
        m => m.Projects
      ),

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
        path: ':id/epics',

        loadComponent: () => import('../Epics/epics/epics').then((m) => m.Epics),
      },


  // {
  //   path: ':id',

  //   children: [
  //     {
  //       path: 'epics',
  //       loadComponent: () => import('../Epics/epics/epics').then((m) => m.Epics),
  //     },
  //   ]
  //   }

  //     // {

  //     //   path: 'tasks',

  //     //   loadComponent: () =>

  //     //     import(').then(

  //     //       m => m.TasksComponent

  //     //     ),

  //     // },

  //     // {

  //     //   path: 'members',

  //     //   loadComponent: () =>

  //     //     import('./pages/members/members.component').then(

  //     //       m => m.MembersComponent

  //     //     ),

  //     // },
  //   ],
  // },
];
