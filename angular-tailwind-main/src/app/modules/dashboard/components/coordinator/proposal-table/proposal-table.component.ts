import { Component } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[proposal-table]',
  templateUrl: './proposal-table.component.html',
  styleUrls: ['./proposal-table.component.scss'],
})
export class ProposalTableComponent {
  public activeFaculty: IUser[] = [];

  constructor(private _accountService: AccountService) {}
  ngOnInit(): void {
    this.fetchFaculties();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchFaculties();
    });
  }

  fetchFaculties(): void {
    this._accountService.getAllFaculty().subscribe({
      next: (faculty) => (this.activeFaculty = faculty),
      error: (error) => alert(error.message),
    });
  }

  onSubmit() {
    //accept the faculty
  }

  openDialog() {
    console.log('test');
  }

  closeDialog() {
    // notify home component that the overlay is inactive
    // this.overlayService.hideOverlay.emit();
  }

  isDialogOpen() {
    return false;
  }
}
