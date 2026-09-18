import { Component, inject, signal,  } from '@angular/core';
import { Router } from '@angular/router';
import { AddProjectModel } from '../../models/projects';
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';
import { ProjectsServiceService } from '../../services/projects-service.service';
import { finalize } from 'rxjs';

@Component({
  imports: [FormField],
  selector: 'app-add-edit-projects',
  styleUrl: './add-edit-projects.scss',
  templateUrl: './add-edit-projects.html',
})
export class AddEditProjects {
  router= inject(Router)
  ProjectsService = inject(ProjectsServiceService)
  isCreating = signal(false)
  hasServerErr= signal(false)

  projectModel = signal<AddProjectModel>({
      name: '',
    description: ''
  })
  addProjectForm = form(this.projectModel , (path)=>{
    required(path.name , {message : ' Project title is required'})
    minLength(path.name , 3 ,{message : 'Project title must be at least 3 characters'} )
    maxLength(path.name , 100 ,{message : 'Project title must not be more than 100 characters'} )
    maxLength(path.description , 500 ,{message : 'Description must not be more than 500 characters'} )
  })


  goTo(){
    this.router.navigate(['/MainLayout/Projects'])
  }


  createProject(event:Event){
    event.preventDefault( );
    if(this.addProjectForm().invalid() || this.isCreating()){
      return ;
    }

    this.isCreating.set(true)

    this.ProjectsService.createProject(this.projectModel()).pipe(
      finalize ( ()=> { this.isCreating.set(false)})
    ).subscribe({
      next :(res)=> {

        console.log('done' , res);
        this.projectModel.set(
          {  name: '',description: ''}
        )
        this.addProjectForm().reset()
         this.hasServerErr.set(false)
      },
      error:(err)=> {
        console.log(err);
        this.hasServerErr.set(true)
          this.addProjectForm().reset()

      },
    })






  }




}
