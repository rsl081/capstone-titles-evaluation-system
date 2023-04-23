import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: '[assign-table]',
  templateUrl: './assign-table.component.html',
  styleUrls: ['./assign-table.component.scss'],
})
export class AssignTableComponent implements OnInit {

  public activeCoordinator: any[] = [];

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchFacultyAdviserPanel();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchFacultyAdviserPanel();
    });
  }

  fetchFacultyAdviserPanel(): void {
    this._accountService.getAllAdviserAndPanel().subscribe({
      next: (coordinator) => (this.activeCoordinator = coordinator),
      error: (error) => alert(error.message),
    });
  }

}
