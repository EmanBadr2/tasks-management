// import { Service } from '@angular/core';

// @Service()
// export class Auth {}


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/LoginRequest';
import { RegisterReqApi } from '../../models/RegisterRequest';
import { LoginResponse } from '../../models/loginRes';
import { forgetReq } from '../../models/resetPass';


@Injectable({
  providedIn: 'root'
})
export class Auth {
 private httpClient = inject(HttpClient)


 signUp(data:RegisterReqApi):Observable<object | LoginResponse>{
    return this.httpClient.post(`/auth/v1/signup`,data)
  }


  login(data:LoginRequest):Observable<object>{
    return this.httpClient.post(`/auth/v1/token`,data
    , { params:{ grant_type: 'password'}})
  }

 logout():Observable< null | object>{
 return this.httpClient.post('/auth/v1/logout' , null)
 }

 forgotPassword(data:forgetReq):Observable<object>{
  return this.httpClient.post(`/auth/v1/recover` , data)
 }

}
