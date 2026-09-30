// import { Service } from '@angular/core';

// @Service()
// export class User {}


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { UserData } from '../models/user-interface';
@Injectable({
  providedIn: 'root'
})
 export class userService {
  private httpClient = inject(HttpClient)


getUserData():Observable<UserData>{
  return this.httpClient.get<UserData>('/auth/v1/user')
}




  createAvatar(name:string) {
   const userName = name?.trim().split(/\s+/);
     if (userName.length === 1) {
      const avatar = userName[0].slice(0, 2).toUpperCase();
    return avatar
  }
  const avatar = (userName[0].charAt(0) + userName[userName.length-1].charAt(0)).toUpperCase()
     return avatar
  }

 }
