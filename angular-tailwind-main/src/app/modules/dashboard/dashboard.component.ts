import { Component, OnInit } from '@angular/core';
import { Nft } from './models/nft';
import { AccountService } from 'src/app/core/services/account.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  sumOfCoordinator: number = 0;
  sumOfAdviser: number = 0;
  sumOfPanel: number = 0;
  sumOfAdmin: number = 0;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.totalCoordinator();
    this.totalAdviser();
    this.totalPanel();
    this.totalAdmin();
  }

  totalCoordinator() {
    this._accountService.totalCoordinator().subscribe({
      next: (response) => (this.sumOfCoordinator = response),
    });
  }

  totalAdviser() {
    this._accountService.totalAdviser().subscribe({
      next: (response) => (this.sumOfAdviser = response),
    });
  }
  
  totalPanel() {
    this._accountService.totalPanel().subscribe({
      next: (response) => (this.sumOfPanel = response),
    });
  }

  totalAdmin() {
    this._accountService.totalAdmin().subscribe({
      next: (response) => (this.sumOfAdmin = response),
    });
  }


}
