import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// import { ErrorState } from '../../../../shared/components/error-state/error-state';
import { ToastService } from '../../../../../shared/components/toast/toast.service';
import { EpicModel } from '../../../models/epics';
import { form, required, FormField, minLength, pattern } from '@angular/forms/signals';
import { ProjectsServiceService } from '../../../../projects/services/projects-service.service';
import { ActiveProjectService } from '../../../../projects/services/active-project.service';
import { Members } from '../../../../projects/models/members';
import { EpicsService } from '../../../services/epics.service';
import { finalize } from 'rxjs';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-add-epic',
  styleUrl: './add-epic.scss',
  templateUrl: './add-epic.html',
})
export class AddEpic implements OnInit {
  today = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectID.set(id);
      this.allMembers.set(this.ActiveProjectService.getMembers(id)[0].allMembers);
    }
  }

  allMembers = signal<undefined | Members[]>([]);
  hasServerErrMember = signal(false);
  isLoadingMember = signal(false);
  epicsService = inject(EpicsService);
  ProjectsService = inject(ProjectsServiceService);
  ActiveProjectService = inject(ActiveProjectService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  projectID = signal('');
  isLoading = signal(false);
  hasServerErr = signal(false);
  toaster = inject(ToastService);
  epicModel = signal<EpicModel>({
    title: '',
    description: '',
    assignee_id: '',
    deadline: '',
  });
  epicForm = form(this.epicModel, (path) => {
    required(path.title, { message: 'Title is required' });
    minLength(path.title, 3, { message: 'Title must be at least 3 characters' });
    pattern(path.title, /^\S(?:.*\S)?$/, {
      message: 'Title cannot start or end with spaces',
    });
  });

  createEpic(event: Event) {
    event.preventDefault();
    // const title = this.epicModel().title.trim();  --.payload title: title,
    if (this.epicForm().invalid()) {
      return;
    }
    const value = this.epicForm().value();
    const payload = {
      ...value,
      deadline: value.deadline ? value.deadline : null,
      assignee_id: value.assignee_id ? value.assignee_id : null,
      project_id: this.projectID(),
    };
    this.isLoading.set(true);
    this.epicsService
      .createEpic(payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toaster.success('Creating Epic Done');
          this.router.navigate([`/MainLayout/projects/${this.projectID()}/epics`]);
        },
        error: (err) => {
          console.log(err);
          this.hasServerErr.set(true);
          this.toaster.error('failed in creating Epic');
        },
      });
  }
  showMember() {
    if (this.ActiveProjectService.getMembers(this.projectID())[0].isLoading) {
      this.isLoadingMember.set(true);
    }
    if (this.ActiveProjectService.getMembers(this.projectID())[0].hasServerErr) {
      this.hasServerErrMember.set(true);
    }
    this.allMembers.set(this.ActiveProjectService.getMembers(this.projectID())[0].allMembers);
    console.log(this.allMembers());
  }
}
