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


getUserData():Observable<UserData | any>{
  return this.httpClient.get('/auth/v1/user')
}


 }