import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  public pagesMenu$: Observable<MenuItem[]> = new Observable<MenuItem[]>();

  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];

  name: any;

  constructor(private accountService: AccountService, private menuService: MenuService) {
    this.pagesMenu$ = this.menuService.pagesMenu$;
  }

  ngOnInit(): void {
    this.getAppUser();
    this.accountService.userUpdateNeeded.subscribe(() =>{
      this.getAppUser();
    })
  }

  getAppUser(): void {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);

    this.accountService.getCurrentUser(obj.id).subscribe({
      next: (c: any) => {
        this.name = c.displayName;
        // this.appUserId = c.map((r) => r.id);
      },
      error: (error) => console.log(error),
    });
  }

  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }

  public mouseEnter(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.hideMenuClass.forEach((c) => element.classList.remove(c));
      this.showMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  public mouseLeave(event: any): void {
    let element = event.target.querySelector('app-navbar-submenu').children[0];
    if (element) {
      this.showMenuClass.forEach((c) => element.classList.remove(c));
      this.hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}
