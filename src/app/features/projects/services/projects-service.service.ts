import { HttpClient, HttpParams } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddProjectModel, ProjectListDetails } from '../models/projects';
import { Members } from '../models/members';


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

//  getProjectsWithPagination(limit:number , offset:number):Observable<  object>{
//         return this.httpClient.get(`/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,{
//                 headers: { Prefer: 'count=exact', },
//                    observe: 'response',

//         } )
//  }


  getProjectsWithPagination(limit: number, offset: number): Observable<object | any > {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.httpClient.get(`/rest/v1/rpc/get_projects`, {
        params,
        headers: { Prefer: 'count=exact' }, 
        observe: 'response',               
      })
      .pipe(
        map((res) => ({
          items: res.body ?? [],
          totalCount: parseTotalCount(res.headers.get('Content-Range')),
        })),
      );
  }

 getProjectByID(id:string):Observable<ProjectListDetails[]>{
   return this.httpClient.get<ProjectListDetails[]>(`/rest/v1/rpc/get_projects?id=eq.${id}`)
 }

 updateProject(projectId:string , data:AddProjectModel):Observable< object>{
 return this.httpClient.patch(`/rest/v1/projects?id=eq.${projectId}` , data)
 }

 getProjectMembers(id:string):Observable<Members[]>{
  return this.httpClient.get<Members[]>(`/rest/v1/get_project_members?project_id=eq.${id}`)
 }

}

function parseTotalCount(arg0 : string | null): number {
  throw new Error('Function not implemented.');
}

