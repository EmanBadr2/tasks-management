import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { EpicsService } from '../../../services/epics.service';
import { projectEpic } from '../../../models/epics';
import { DatePipe } from '@angular/common';
import { userService } from '../../../../../core/services/user-service';
import { ToastService } from '../../../../../shared/components/toast/toast.service';
import { ErrorState } from '../../../../../shared/components/error-state/error-state';
import { EmptyState } from '../../../../../shared/components/empty-state/empty-state';
import { LoadingState } from '../../../../../shared/components/loading-state/loading-state';

@Component({
  imports: [DatePipe ,ErrorState, LoadingState, EmptyState],
  selector: 'app-epic-details-popup',
  styleUrl: './epic-details-popup.scss',
  templateUrl: './epic-details-popup.html',
})
export class EpicDetailsPopup implements OnInit {
  ngOnInit(): void {
    this.getEpicDetails()
  }

  epicsService = inject(EpicsService)
  userService = inject(userService)
   toaster = inject(ToastService);
  epicId = input.required<string>();
  projectId = input.required<string>();
  isEmptyState = signal(true)
  closePopup = output<void>();
  closeP() { this.closePopup.emit(); }
  epicState=signal<State>('empty')
  epicDetails = signal<projectEpic[]>([])
  getEpicDetails(){
     this.epicState.set('loading')
    this.epicsService.getEpicDetails( this.projectId() , this.epicId()).subscribe({
         next: (res) => { 
           this.epicDetails.set(res)
            // console.log(this.epicDetails()); 
            this.epicState.set(  this.epicDetails().length === 0 ? 'empty'  :'success' )
         } ,
         error: (err) => {
            console.log(err);
              this.toaster.error('failed in get all epics');
                 this.epicState.set('error')
          }
    })
    
  }


  copyLink()  {console.log('copy link'); }
  addTask()  {console.log('add task'); }
}
type State = 'loading' | 'empty' | 'error' | 'success' ;
