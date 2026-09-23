import { Component, inject, OnInit, signal,  } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddProjectModel } from '../../models/projects';
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';
import { ProjectsServiceService } from '../../services/projects-service.service';
import { finalize } from 'rxjs';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-add-edit-projects',
  styleUrl: './add-edit-projects.scss',
  templateUrl: './add-edit-projects.html',
})
export class AddEditProjects implements OnInit {
  ngOnInit(): void {
      const projectId = this.route.snapshot.paramMap.get('id')
        if(projectId){
          this.isEditMode.set(true)
          this.projectID.set(projectId)
          this.getProjectDetails(projectId)
        }
        console.log('edit' , this.isEditMode());

  }
  route =inject(ActivatedRoute)
  router= inject(Router)
  ProjectsService = inject(ProjectsServiceService)

  isLoading = signal(false)
  hasServerErr= signal(false)
  isEditMode = signal(false)
  projectID =signal<string| null>('')

  projectModel = signal<AddProjectModel>({
      name: '',
    description: ''
  })

  ProjectForm = form(this.projectModel , (path)=>{
    required(path.name , {message : ' Project title is required'})
    minLength(path.name , 3 ,{message : 'Project title must be at least 3 characters'} )
    maxLength(path.name , 100 ,{message : 'Project title must not be more than 100 characters'} )
    maxLength(path.description , 500 ,{message : 'Description must not be more than 500 characters'} )
  })

  submit(event:Event){
    event.preventDefault( );
      if(this.ProjectForm().invalid() || this.isLoading()){
      return ;
    }
      this.isLoading.set(true)
      if(this.isEditMode()){
        this.updateProject()
      }else{
         this.createProject()
      }


  }

  createProject(){
    this.ProjectsService.createProject(this.projectModel()).pipe(
      finalize ( ()=> { this.isLoading.set(false)})
    ).subscribe({
      next :(res)=> {
        console.log(' added done' , res);
        this.projectModel.set(
          {  name: '',description: ''}
        )
        this.ProjectForm().reset()
         this.hasServerErr.set(false)
      },
      error:(err)=> {
        console.log(err);
        this.hasServerErr.set(true)
        this.ProjectForm().reset()
      }
    })

  }

  getProjectDetails(id:string){
    this.ProjectsService.getProjectByID(id).subscribe({
       next :(res)=> {
        console.log('done' , res[0]);
        this.projectModel.set({
            name: res[0].name,
            description: res[0].description
        })
       },
        error :(err)=> {
        console.log('err' , err);
        }
    })

  }

  updateProject(){
    if(this.projectID() ){
      this.ProjectsService.updateProject(this.projectID()!, this.projectModel()).pipe(
      finalize ( ()=> { this.isLoading.set(false)})
    ).subscribe({
            next :(res)=> {
        console.log('updated done' , res );
        // toaster mess   Project updated successfully
        this.hasServerErr.set(false)
         this.router.navigate(['/MainLayout/projects'])
            }
       ,
        error :(err)=> {
        console.log('err' , err);
        // toaster mess err
         this.hasServerErr.set(true)
        }
      })
 }

  }

}

