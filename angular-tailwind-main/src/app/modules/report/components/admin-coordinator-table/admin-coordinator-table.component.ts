import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[admin-coordinator-table]',
  templateUrl: './admin-coordinator-table.component.html',
  styleUrls: ['./admin-coordinator-table.component.scss'],
})
export class AdminCoordinatorTableComponent implements OnInit {
  public activeCoordinator: IUser[] = [];

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchCoordinator();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchCoordinator();
    });
  }

  fetchCoordinator(): void {
    this._accountService.getAllCoordinator().subscribe({
      next: (coordinator) => (this.activeCoordinator = coordinator),
      error: (error) => alert(error.message),
    });
  }

  
}
