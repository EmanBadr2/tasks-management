import { Component, input, output  } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-empty-state',
  styleUrl: './empty-state.scss',
  templateUrl: './empty-state.html',
})
export class EmptyState {

feature = input<string>('project')
addAction = output<void>();



//   emptyState = [
//   {srcpath:'../../../../../assets/icons/empty.svg' , srcIcon :'../../../../assets/icons/addd.svg' , feature:'project'},
//  {srcpath:'../../../../../assets/icons/E.svg' , srcIcon :'../../../../assets/icons/gE.svg', feature:'epic'},
//   ]


}
