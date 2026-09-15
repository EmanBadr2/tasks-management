import { Component, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';


@Component({
  imports: [FormField],
  selector: 'app-reusable-input',
  styleUrl: './reusable-input.scss',
  templateUrl: './reusable-input.html',
})
export class ReusableInput {

  field = input.required<FieldTree<string >>();
  // field = input.required<any>();

  id = input('');

  label = input<string>('');
  hint = input()
  type = input< 'text' | 'email' | 'password' | 'tel' | 'search'>('text');
  placeholder = input('');



passwordVisible = signal<boolean>(false)
accessShowIcon = input<boolean>(true)
togglePasswordVisibility(){
this.passwordVisible.update(value => !value)
// console.log(this.passwordVisible());
}
}



