import { Component, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[faculty-table]',
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.scss'],
})
export class FacultyTableComponent implements OnInit {
  public activeFaculty: IUser[] = [];

  constructor() {
    this.activeFaculty = [
      {
        photoUrl: 'assets/images/Faculty.png',
        displayName: 'test',
        email: 'text@test.com',
        expertise: 'wbe',
        approval: false,
      },
    ];
  }
  ngOnInit(): void {}

  onSubmit() {
    //accept the faculty
  }

  openDialog() {
    console.log('test')
  }

  closeDialog() {
    

    // notify home component that the overlay is inactive
    // this.overlayService.hideOverlay.emit();
  }

  isDialogOpen() {
    return false;
  }
}
