import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive,  } from '@angular/router';
import { Auth } from '../../features/auth/services/services/auth';
import { filter } from 'rxjs';


@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar implements OnInit {
  ngOnInit(): void {

    this.getProjectID(); //refresh
    this.isActiveProject();
    //  after all navigation -- handles navigation/change.
    this.router.events.pipe(filter((event) =>
       event instanceof NavigationEnd
  )).subscribe(() => {
      this.getProjectID();
      this.isActiveProject();

    });

    this.projectMenuLinks();
  }

  private router = inject(Router);
  projectId = signal<string>('');

  private authService = inject(Auth);
  menuMobileCase = input(false);
  footerMobileCase = input(false);
  activeLink = this.router.url;
  isCollapsed = signal(false);
  isMenuOpen = signal(true);

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

 

  getProjectID() {
    const  id=signal(this.router.url.split('/').at(3)! )
    // test id by uuID regex
     const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id());
    if(isUuid){
    this.projectId.set(id());
    }else{
       this.projectId.set('');
    }

  }
  isActiveProject(): boolean {
    return this.projectId() !== '' ? true : false;
  }

  toggleProjectMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  toggleCollapse() {
    this.isCollapsed.update((value) => !value);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        this.router.navigate(['/auth/login']);
        console.log('logout');
      },
    });
    console.log('error in logout');
  }
}
