import { Component, output } from '@angular/core';



@Component({
  imports: [],
  selector: 'app-error-state',
  styleUrl: './error-state.scss',
  templateUrl: './error-state.html',
})
export class ErrorState {

retry= output<void>();
}
