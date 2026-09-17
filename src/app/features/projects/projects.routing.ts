import { Routes } from '@angular/router';

 export const ProjectsRoute : Routes = [
  
          {
            path:'' ,
            redirectTo : 'Projects' ,
            pathMatch : 'full' ,
          },

           { path : 'Projects' , loadComponent : () =>
        import( './components/projects/projects').then(
          m => m.Projects
        ), } ,
    {  
          path: 'ProjectsList' ,
          loadComponent : ()=>
            import('./components/projects-list/projects-list').then(
              m=>m.ProjectsList
             ),
        } ,
         {  
          path: 'AddEditProjects' ,
          loadComponent : ()=>
            import('./components/add-edit-projects/add-edit-projects').then(
              m=>m.AddEditProjects
             ),
        } ,
  
 
  
        ]
  
  
