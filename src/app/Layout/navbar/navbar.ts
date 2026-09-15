import { Component, input, signal } from '@angular/core';
import { UserData } from '../../core/models/user-interface';

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  userData = input<null | UserData>()


  creatAvatar(){
    if(this.userData())
    {
  const userName = this.userData()?.user_metadata.name.trim().split(/\s+/)
  
    if(userName?.length === 1){
      const avatar = userName[0].charAt(0).toUpperCase()
      return avatar
    }
      const avatar = (userName[0].charAt(0) + userName[length-1].charAt(0)).toUpperCase()
     return avatar
    }
  }



}
