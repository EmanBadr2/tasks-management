import { Component, inject, signal ,OnInit, computed } from '@angular/core';
import { Router, } from '@angular/router';
import { ProjectsServiceService } from '../../services/projects-service.service';
import { ProjectListDetails } from '../../models/projects';
import { ProjectsList } from '../projects-list/projects-list';
import { ErrorState } from '../../../../shared/components/error-state/error-state';
import { LoadingState } from '../../../../shared/components/loading-state/loading-state';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Pagination } from '../../../../shared/pagination/pagination';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

type State = 'loading' | 'empty' | 'error' | 'success' ;

@Component({
  imports: [ProjectsList, ErrorState, LoadingState, EmptyState,  Pagination],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects  implements OnInit {

  ngOnInit(){
      this.getAllProject()
    //  this.loadProjects(1);
    this.loadProjects(2)
      
  }

private router= inject(Router)
ProjectsService = inject(ProjectsServiceService)
projectList = signal<ProjectListDetails[]>([])
projectState=signal<State>('loading')
// -----------
 readonly paginationMetadataError = signal(false);
  readonly totalPages = computed(() => {
    const total = this.totalCount();
    if (total === null || total === 0) { return 0;  }
    return Math.ceil(total / this.limit);
  });
  readonly totalCount = signal<number | null>(null);
  readonly  currentPage =signal(1)
  readonly limit = 10;
  readonly projects = signal<ProjectListDetails[]>([]);

// totalCount =signal(0)
// totalPages   = computed( ()=>{  Math.ceil( this.totalCount() / this.limit) });
offset  = computed( ()=>{  Math.ceil( (this.currentPage()-1 )* this.limit ) });
loading=signal(false)
error =signal(false)
// ----------
// --------------------
getAllProject(){
   this.projectState.set('loading')
  this.ProjectsService.getAllProjects().subscribe({
    next :(res)=>{
      this.projectList.set(res);
      // console.log(this.projectList());
        this.projectState.set(  this.projectList().length === 0 ? 'empty'  :'success' )
    } ,
     error :(err)=>{
      console.log(err);
        this.projectState.set('error')
        this.router.navigate(['/MainLayout/error'])
  }

  })



}

 gotoNewProject(){
     this.router.navigate(['MainLayout/projects' ,'epics'])
  }


// ----------------------------
private getTotalCount(  response: HttpResponse<ProjectListDetails[]> ): number | null {
  const contentRange = response.headers.get('Content-Range');
  if (!contentRange) {  return null; }
  const match = contentRange.trim().match(/\/(\d+)$/);
  if (!match) {  return null; }
  const total = Number(match[1]);
  if (!Number.isSafeInteger(total) || total < 0) {  return null; }
  return total;
}
  // ----------------
  private loadProjects(page: number): void {
  if (this.loading()) { return; }
  const offset = (page - 1) * this.limit;
  this.loading.set(true);
  this.error.set(false);
  this.paginationMetadataError.set(false);

  this.ProjectsService.getProjectsWithPagination(this.limit, offset)
    .pipe( finalize(() => { this.loading.set(false); }) )
    .subscribe({
      next: (response) => {
        console.log(response);
        
        const projects = response.body ?? [];
        const totalCount = this.getTotalCount(response);
        this.projects.set(projects);
        this.currentPage.set(page);
        this.totalCount.set(totalCount);
        this.paginationMetadataError.set(totalCount === null);
      },
      error: () => {  this.error.set(true); },
    });
}

  // -----------------
// pagination

  pageSize =signal(3)

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
