import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: '[proposal-table-item]',
  templateUrl: './proposal-table-item.component.html',
  styleUrls: ['./proposal-table-item.component.scss'],
})
export class ProposalTableItemComponent implements OnInit{

  approvedForm!: FormGroup;
  @Input() faculty = <any>{};
  isOpen = false;

  constructor(private _accountService: AccountService, 
    private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  openDialog() {
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
  }

  onSubmit() {
    const myFaculty = {
      email: this.faculty.email,
      displayName: this.faculty.displayName,
      isApproved: true,
      expertise: this.faculty.expertise,
    };

    this._accountService.editFaculty(myFaculty).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        window.location.reload();
      },
    });
  }

}
