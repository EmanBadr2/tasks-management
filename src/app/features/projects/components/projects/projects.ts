import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectsServiceService } from '../../services/projects-service.service';
import { ProjectListDetails } from '../../models/projects';
import { ProjectsList } from '../projects-list/projects-list';


@Component({
  imports: [RouterLink, ProjectsList],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  constructor(){
    this.getAllProject()
  }
private router= inject(Router)
ProjectsService = inject(ProjectsServiceService)
projectList = signal<ProjectListDetails[]>([])

isEmptyState = signal(false)
isLoadingState = signal(false)
isErrorState = signal(false)

getAllProject(){
  this.ProjectsService.getAllProjects().subscribe({
    next :(res)=>{
      this.projectList.set(res);
       console.log(this.projectList());
    } ,
     error :(err)=>{
      console.log(err);
    }
  })
}


}
