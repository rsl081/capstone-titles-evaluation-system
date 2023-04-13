import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[teacher-table]',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.scss'],
})
export class TeacherTableComponent implements OnInit {
  
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
  
}
