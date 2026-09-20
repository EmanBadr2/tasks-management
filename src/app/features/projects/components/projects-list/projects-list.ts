import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  projectList = input.required<ProjectListDetails[]>()
  
  currentPage =signal(1)
  pageSize =signal(3)




// Get projects for the current page
  paginatedProjects  = computed( ()=>{
    const start =( this.currentPage()-1 )* this.pageSize()
    const end = start + this.pageSize()
    return this.projectList().slice(start , end)
  })

  changePage(page : number){
    this.currentPage.set(page)
  }







}
