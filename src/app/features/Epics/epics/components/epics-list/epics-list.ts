import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { ErrorState } from '../../../../shared/components/error-state/error-state';
import { ToastService } from '../../../../../shared/components/toast/toast.service';
import { EpicsService } from '../../../services/epics.service';
import { finalize } from 'rxjs';
import { projectEpic } from '../../../models/epics';
import { DatePipe } from '@angular/common';
import { userService } from '../../../../../core/services/user-service';

@Component({
  imports: [DatePipe],
  selector: 'app-epics-list',
  styleUrl: './epics-list.scss',
  templateUrl: './epics-list.html',
})

export class EpicsList implements OnInit {


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {  this.projectID.set(id); }
    this.getProjectEpics()
  }
   userService=inject(userService)
 route = inject(ActivatedRoute);
  router = inject(Router);
  projectID = signal('');
  isLoading = signal(false);
  hasServerErr = signal(false);
  toaster = inject(ToastService);
  epicsService = inject(EpicsService);
  allProjectEpics = signal<projectEpic[]>([])


  getProjectEpics(){
    this.isLoading.set(true)
    this.epicsService.getProjectEpics(this.projectID()).pipe(finalize(() => this.isLoading.set(false)))
          .subscribe({
            next: (res) => {
              this.allProjectEpics.set(res)
              // console.log( this.allProjectEpics());
              this.toaster.success('this is all project epics');
            },
            error: (err) => {
              console.log(err);
              this.hasServerErr.set(true);
              this.toaster.error('failed in get all epics');
            },
          });
  }






}
