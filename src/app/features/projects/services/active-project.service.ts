import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProjectsServiceService } from './projects-service.service';
import { Members } from '../models/members';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectService {
 private httpClient =inject(HttpClient)

allMembers=signal<Members[]>([])
hasServerErr = signal(false)
isLoading = signal(false)

ProjectsService = inject(ProjectsServiceService)


  getMembers(projectID:string){
       this.isLoading.set(true)
    this.ProjectsService.getProjectMembers(projectID).subscribe({
      next :(res)=> {
      this.allMembers.set(res)
      // console.log(this.allMembers() , 'active service');

          this.isLoading.set(false)
      },
      error:(err)=> {
        console.log(err);
        this.hasServerErr.set(true)
         this.isLoading.set(false)
      }

    })

    return [  {'allMembers': this.allMembers() }, {'hasServerErr': this.hasServerErr()} ,{'isLoading' : this.isLoading()}]
  }
}



