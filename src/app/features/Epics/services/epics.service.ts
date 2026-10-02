import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EpicRes } from '../models/epics';

@Injectable({
  providedIn: 'root'
})
export class EpicsService {

 private httpClient =inject(HttpClient)


 createEpic(data:EpicRes):Observable<object>{
  return this.httpClient.post(`/rest/v1/epics`, data)
 }

}
