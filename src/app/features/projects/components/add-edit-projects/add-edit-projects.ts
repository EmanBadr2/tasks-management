import { Component, inject, signal,  } from '@angular/core';
import { Router } from '@angular/router';
import { AddProjectModel } from '../../models/projects';
import { form, maxLength, minLength, required, FormField } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-add-edit-projects',
  styleUrl: './add-edit-projects.scss',
  templateUrl: './add-edit-projects.html',
})
export class AddEditProjects {
  router= inject(Router)
  

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
  addProject(event:Event){
    event.preventDefault( );
    
    console.log(this.addProjectForm.name().errors());
    console.log(this.addProjectForm().valid());
    console.log(this.addProjectForm().value());

    console.log(this.projectModel());



    
  }




}
