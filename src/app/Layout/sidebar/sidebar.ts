import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {


private router = inject( Router)
activeLink = this.router.url
   isCollapsed = signal(false)
   isMenuOpen = signal(true)
   projectMenuItems= [
    {label : 'Epics' ,
      srcIcon : "../../../../Icon.svg" ,
      route: '/MainLayout/Projects'
    } ,
     {label : 'Tasks' ,
      srcIcon : "../../../../Icon.svg" ,
      route: '/MainLayout/ProjectsList'
    } ,
     {label : 'Members' ,
      srcIcon : "../../../../Icon.svg" ,
      route: '/MainLayout/Pro'
    } ,
     {label : 'Details' ,
      srcIcon : "../../../../Icon.svg" ,
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
    console.log('logout');
    
   }

   
}
