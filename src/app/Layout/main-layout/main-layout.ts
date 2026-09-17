import { Component, inject , signal  } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { userService } from '../../core/services/user-service';
import { UserData } from '../../core/models/user-interface';

@Component({
  imports: [Navbar, Sidebar , RouterOutlet],
  selector: 'app-main-layout',
  styleUrl: './main-layout.scss',
  templateUrl: './main-layout.html',
})
export class MainLayout {
  private userService = inject(userService)
  userData = signal<UserData | null>(null)

 ngOnInit() {
  this.userService.getUserData().subscribe({
    next : (res)=>{
      this.userData.set(res)
      console.log(this.userData());
      
    } ,
    error  : (err)=>{
      console.log(err);
      
    } ,
  })

  }

menuOpened = signal(false)
  toggleSidebar(){
    this.menuOpened.update( value => ! value)
    console.log(this.menuOpened());
    
    
  }
  
}
