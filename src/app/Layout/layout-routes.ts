import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { ErrorState } from '../shared/components/error-state/error-state';



export const LayoutRoutes: Routes = [
//     {
//       path: '',
//       component: MainLayout ,
//       canActivate : [authGuard],
//       children : [
//         {
//           path:'' ,
//           redirectTo : 'Projects' ,
//           pathMatch : 'full'
//         },
//          { path : 'Projects' , loadComponent : () =>
//       import('../features/projects/components/projects/projects').then(
//         m => m.Projects
//       ), } ,
//   {
//         path: 'ProjectsList' ,
//         loadComponent : ()=>
//           import('../features/projects/components/projects-list/projects-list').then(
//             m=>m.ProjectsList
//            ),
//       } ,
//        {
//         path: 'AddEditProjects' ,
//         loadComponent : ()=>
//           import('../features/projects/components/add-edit-projects/add-edit-projects').then(
//             m=>m.AddEditProjects
//            ),
//       } ,



//       ]



// }

{
    path: '',
    component: MainLayout ,
    children :[
       {  path: '' ,
      loadChildren : ()=> import('../features/projects/projects.routing').then(
    m => m.ProjectsRoute
  )
 
} ,

{
  path : 'error' ,
  component: ErrorState
}


    ]
},




]
