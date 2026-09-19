import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProjectListDetails } from '../../models/projects';
@Component({
  imports: [RouterLink , DatePipe],
  selector: 'app-projects-list',
  styleUrl: './projects-list.scss',
  templateUrl: './projects-list.html',
})
export class ProjectsList {


  projectList = input.required<ProjectListDetails[]>()
}
