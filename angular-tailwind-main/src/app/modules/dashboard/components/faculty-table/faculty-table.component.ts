import { Component, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: '[faculty-table]',
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.scss'],
})
export class FacultyTableComponent implements OnInit {
  public activeFaculty: IUser[] = [];

  constructor(private _accountService: AccountService) { }
  ngOnInit(): void {
    this.fetchFaculties();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchFaculties();
    })
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
