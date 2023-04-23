import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: '[approval-table-item]',
  templateUrl: './approval-table-item.component.html',
  styleUrls: ['./approval-table-item.component.scss'],
})
export class ApprovalTableItemComponent implements OnInit {
  
  approvedForm!: FormGroup;
  @Input() faculty = <any>{};
  isOpen = false;
  userRole = [];

  constructor(private _accountService: AccountService, 
    private readonly _formBuilder: FormBuilder) {}

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
    this._accountService.editRoles(this.faculty.email, 'Panel').subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        alert('Successfully Updated')
        this._accountService.userUpdateNeeded.next(this.faculty);
      },
    });
  }

  onCancel() {
    
    this._accountService.editRoles(this.faculty.email, 'Adviser').subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        alert('Successfully Updated')
        this._accountService.userUpdateNeeded.next(this.faculty);
        this.closeDialog();
      },
    });

  }
}
