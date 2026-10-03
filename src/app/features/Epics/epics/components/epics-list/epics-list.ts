import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  }
   userService=inject(userService)
 route = inject(ActivatedRoute);

  router = inject(Router);
  projectID = signal('');


  allProjectEpics = input.required<projectEpic[]>()

gotoNewEpic(){
  this.router.navigate(['MainLayout/projects',this.projectID() ,'epics','new'])
}






}
