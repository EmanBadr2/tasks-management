import { Component, inject, input } from '@angular/core';
import { UserData } from '../../core/models/user-interface';
import { userService } from '../../core/services/user-service';

@Component({
  imports: [],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {

  userData = input<null | UserData>();
 userService=inject(userService)

  createAvatar() {
   const name = this.userData()?.user_metadata.name
   if (!name) {
    return '';
  }
  return this.userService.createAvatar(name)

  }
}
