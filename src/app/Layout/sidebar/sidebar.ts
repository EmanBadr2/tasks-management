import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {

   isCollapse = signal(false)
   
  collapseSidebar(){
    this.isCollapse.update( value => !value)
    console.log(this.isCollapse());
    
   }
   logout(){
    console.log('logout');
    
   }

   
}
