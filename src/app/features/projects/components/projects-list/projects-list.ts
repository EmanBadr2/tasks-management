import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProjectListDetails } from '../../models/projects';
import { Pagination } from '../../../../shared/pagination/pagination';

@Component({
  imports: [RouterLink, DatePipe, Pagination],
  selector: 'app-projects-list',
  styleUrl: './projects-list.scss',
  templateUrl: './projects-list.html',
})
export class ProjectsList {
 private router = inject(Router)
  projectList = input.required<ProjectListDetails[]>()

  currentPage =signal(1)
  pageSize =signal(3)
  // --
  currentId =signal( '')
  currentName =signal( '')
  isActiveProject = signal(false)

// --------------
selectProject(project:ProjectListDetails){
  this.currentId.set(project.id)
  this.currentName.set(project.name)
  this.isActiveProject.set(true)
  console.log( this.currentId() , this.currentName());
    this.router.navigate([
    '/MainLayout/projects/',
    project.id,
    'epics'

  ]);
 

}










// ----------------
// pagination

// Get projects for the current page then
  paginatedProjects  = computed( ()=>{
    const start =( this.currentPage()-1 )* this.pageSize()
    const end = start + this.pageSize()
    return this.projectList().slice(start , end)
  })

  changePage(page : number){
    this.currentPage.set(page)
  }

// ----------------------





}
