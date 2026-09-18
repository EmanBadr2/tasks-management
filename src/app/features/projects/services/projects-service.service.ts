import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProjectModel, ProjectListDetails } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsServiceService {
 private httpClient =inject(HttpClient)

 createProject(data:AddProjectModel):Observable< object>{
 return this.httpClient.post(`/rest/v1/projects` , data)
 }

  getAllProjects():Observable< ProjectListDetails[] >{
        return this.httpClient.get< ProjectListDetails[] >(`/rest/v1/rpc/get_projects` )
 }




}
