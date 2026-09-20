import { Component, inject, signal ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsServiceService } from '../../services/projects-service.service';
import { ProjectListDetails } from '../../models/projects';
import { ProjectsList } from '../projects-list/projects-list';
import { ErrorState } from '../../../../shared/components/error-state/error-state';
import { LoadingState } from '../../../../shared/components/loading-state/loading-state';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

type State = 'loading' | 'empty' | 'error' | 'success' ;

@Component({
  imports: [ ProjectsList, ErrorState, LoadingState, EmptyState],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects  implements OnInit {

  ngOnInit(){
      this.getAllProject()
      // this.projectState.set('empty')
  }

private router= inject(Router)
ProjectsService = inject(ProjectsServiceService)
projectList = signal<ProjectListDetails[]>([])
projectState=signal<State>('loading')

getAllProject(){
   this.projectState.set('loading')
  this.ProjectsService.getAllProjects().subscribe({
    next :(res)=>{
      this.projectList.set(res);
        this.projectState.set(  this.projectList().length === 0 ? 'empty'  :'success' )
    } ,
     error :(err)=>{
      console.log(err);
        this.projectState.set('error')
        // this.router.navigate(['/MainLayout/error'])
  }

  })



}




}
