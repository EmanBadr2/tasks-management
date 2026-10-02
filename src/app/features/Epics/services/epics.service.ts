import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EpicRes , projectEpic } from '../models/epics';

@Injectable({
  providedIn: 'root'
})
export class EpicsService {

 private httpClient =inject(HttpClient)


 createEpic(data:EpicRes):Observable<object>{
  return this.httpClient.post(`/rest/v1/epics`, data)
 }
  getProjectEpics(projectID:string):Observable<projectEpic[]>{
  return this.httpClient.get<projectEpic[]>(`/rest/v1/project_epics?project_id=eq.${projectID}`)
 }



}
