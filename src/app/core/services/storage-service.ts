// import { Service } from '@angular/core';
// @Service()
// export class StorageService {}

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class StorageService {

   access_token = localStorage.getItem('access_token')
   refresh_token = localStorage.getItem('refresh_token')



}
