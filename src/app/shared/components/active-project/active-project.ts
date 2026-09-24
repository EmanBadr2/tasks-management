
import { Component, computed,  input,  signal } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  imports: [RouterLink],
  selector: 'app-active-project',
  styleUrl: './active-project.scss',
  templateUrl: './active-project.html',
})
export class ActiveProject {

 footerMobileCase = input(false);
 isCollapsed = signal(false);
  isMenuOpen = signal(true);
 projectId = signal<string>('');
  projectMenuLinks = computed(() => {
    const id = this.projectId();
    if (!id) {
      return [];
    }

    return [
      {
        label: 'Epics',
        srcIcon: 'assets/icons/epics.svg',
        route: ['/MainLayout/projects/', id, 'epics'],
      },
      {
        label: 'Tasks',
        srcIcon: ' assets/icons/tasks.svg',
        route: ['/MainLayout/projects/', id, 'tasks'],
      },
      {
        label: 'Members',
        srcIcon: ' assets/icons/members.svg',
        route: ['/MainLayout/projects/', id, 'member'],
      },
      {
        label: 'Details',
        srcIcon: ' assets/icons/details.svg',
        route: ['/MainLayout/projects/', id, 'edit'],
      },
    ];
  });


toggleProjectMenu() {
    this.isMenuOpen.update((value) => !value);
  }

 isActiveProject(): boolean {
    return this.projectId() !== '' ? true : false;
  }

}
