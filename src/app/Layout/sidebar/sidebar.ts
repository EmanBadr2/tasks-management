import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {

   isCollapsed = signal(false)
   hiddenItem = signal(false)

   toggleActiveProject(){
  this.hiddenItem.update( value => !value)
  
   }
   
  collapsedSidebar(){
    this.isCollapsed.update( value => !value)
   
   }
   
   logout(){
    console.log('logout');
    
   }

   
}
