import { Component } from '@angular/core';
import { EpicsList } from './components/epics-list/epics-list';

@Component({
  imports: [EpicsList],
  selector: 'app-epics',
  styleUrl: './epics.scss',
  templateUrl: './epics.html',
})
export class Epics {}
