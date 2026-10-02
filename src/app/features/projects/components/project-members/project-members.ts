import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectsServiceService } from '../../services/projects-service.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Members } from '../../models/members';
import { ErrorState } from '../../../../shared/components/error-state/error-state';
import { userService } from '../../../../core/services/user-service';


@Component({
  imports: [RouterLink, ErrorState],
  selector: 'app-project-members',
  styleUrl: './project-members.scss',
  templateUrl: './project-members.html',
})
export class ProjectMembers implements OnInit {
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.projectID.set( id)
    }

    this.getMembers()
  }
  userService=inject(userService)
  route = inject(ActivatedRoute)
  router= inject(Router)
  ProjectsService=inject(ProjectsServiceService)
  projectID = signal('')
 isLoading = signal(false)
  hasServerErr= signal(false)
toaster=inject(ToastService)
allMembers=signal<Members[]>([])
role = ['owner' , 'admin' , 'member' , 'viewer']


  getMembers(){
    this.ProjectsService.getProjectMembers(this.projectID()).subscribe({
      next :(res)=> {
      this.allMembers.set(res)
      console.log(this.allMembers());
      this.toaster.success('this is All Members in your Project')
         this.hasServerErr.set(false)
      },
      error:(err)=> {
        console.log(err);
        this.hasServerErr.set(true)
        this.toaster.error('some thing error')
      }
    })

  }
}
