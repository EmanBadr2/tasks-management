import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../features/auth/services/services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {

private router = inject( Router)
private authService = inject(Auth)
 menuMobileCase = input(false)
 footerMobileCase = input(false)
activeLink = this.router.url
   isCollapsed = signal(false)
   isMenuOpen = signal(true)
   isActiveProject = signal(false)
   projectMenuItems= [
    {label : 'Epics' ,
      srcIcon : "assets/icons/epics.svg" ,
      route: '/MainLayout/Projects'
    } ,
     {label : 'Tasks' ,
      srcIcon : " assets/icons/tasks.svg"  ,
      route: '/MainLayout/ProjectsList'
    } ,
     {label : 'Members' ,
      srcIcon : " assets/icons/members.svg" ,
      route: '/MainLayout/Pro'
    } ,
     {label : 'Details' ,
      srcIcon : " assets/icons/details.svg" ,
      route: '/MainLayout/Pr'
    } ,
   ]

   isActive(route:null| string):boolean{
    this.activeLink=this.router.url
    if(this.activeLink === route){
        return true
    }

    return false

   }

   toggleProjectMenu(){
  this.isMenuOpen.update( value => !value)
   }

  toggleCollapse(){
    this.isCollapsed.update( value => !value)
   }

   logout(){
    this.authService.logout().subscribe({
      next: () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('userId') ;
        this.router.navigate(['/auth/login']);

        console.log('logout');

      }
    })
   console.log('errror');


   }


}
