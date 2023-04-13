import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[teacher-table-item]',
  templateUrl: './teacher-table-item.component.html',
  styleUrls: ['./teacher-table-item.component.scss'],
})
export class TeacherTableItemComponent implements OnInit {
  @Input() faculty = <IUser>{};
  userRole = [];
  isOpen = false;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.userRole = this.faculty.userRoles.map((e) => e);
  }

  openDialog() {
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
  }


  onSubmit() {
  
    this._accountService.editRoles(this.faculty.email, 'Coordinator').subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        window.location.reload();
      },
    });

  }

}
