import { Component, inject, OnInit, signal } from '@angular/core';
import { EpicsList } from './components/epics-list/epics-list';

import { ActivatedRoute, Router } from '@angular/router';





import { EpicsService } from '../services/epics.service';
import { userService } from '../../../core/services/user-service';
import { projectEpic } from '../models/epics';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ErrorState } from '../../../shared/components/error-state/error-state';
import { LoadingState } from '../../../shared/components/loading-state/loading-state';

@Component({
  imports: [EpicsList, ErrorState, LoadingState],
  selector: 'app-epics',
  styleUrl: './epics.scss',
  templateUrl: './epics.html',
})
export class Epics implements OnInit {


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {  this.projectID.set(id); }
    this.getProjectEpics()

  }

 route = inject(ActivatedRoute);
  router = inject(Router);

  projectID = signal('');


   userService=inject(userService)
  toaster = inject(ToastService);
  epicsService = inject(EpicsService);
  allProjectEpics = signal<projectEpic[]>([])
  epicState=signal<State>('loading')

   getProjectEpics(){
      this.epicState.set('loading')
    this.epicsService.getProjectEpics(this.projectID())
          .subscribe({
            next: (res) => {
              this.allProjectEpics.set(res)
              this.toaster.success('this is all project epics');
                 this.epicState.set(  this.allProjectEpics().length === 0 ? 'empty'  :'success' )
                  //  console.log( this.allProjectEpics());
                       //  console.log(this.epicState());
            },
            error: (err) => {
              console.log(err);
              this.toaster.error('failed in get all epics');
                 this.epicState.set('error')
            },
          });
  }



}
type State = 'loading' | 'empty' | 'error' | 'success' ;
