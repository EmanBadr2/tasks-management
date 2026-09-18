import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProjectsServiceService } from '../../services/projects-service.service';
import { ProjectListDetails } from '../../models/projects';


@Component({
  imports: [RouterLink],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
private router= inject(Router)
ProjectsService = inject(ProjectsServiceService)
projectList = signal<ProjectListDetails[]>([])

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
