import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { projectEpic } from '../../../models/epics';
import { DatePipe } from '@angular/common';
import { userService } from '../../../../../core/services/user-service';
import { EpicDetailsPopup } from '../epic-details-popup/epic-details-popup';


@Component({
  imports: [DatePipe, EpicDetailsPopup],
  selector: 'app-epics-list',
  styleUrl: './epics-list.scss',
  templateUrl: './epics-list.html',
})

export class EpicsList implements OnInit {


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {  this.projectID.set(id); }

  }
 userService=inject(userService)
 route = inject(ActivatedRoute);
 router = inject(Router);

  projectID = signal('');
  selectedEpicId = signal<string>('');
  isPopupOpen = signal(false);
  allProjectEpics = input.required<projectEpic[]>()


  openEpicDetails(epicID:string){
    this.selectedEpicId.set(epicID)
    // console.log(this.selectedEpicId());
    this.isPopupOpen.set(true);
  }

closeEpic() {
  this.selectedEpicId.set('');
   this.isPopupOpen.set(false);
}

gotoNewEpic(){
  this.router.navigate(['MainLayout/projects',this.projectID() ,'epics','new'])
}






}
