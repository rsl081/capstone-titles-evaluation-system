import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';
import { JustifileService } from 'src/app/core/services/justifile.service';

@Component({
  selector: '[proposal-table-item]',
  templateUrl: './proposal-table-item.component.html',
  styleUrls: ['./proposal-table-item.component.scss'],
})
export class ProposalTableItemComponent implements OnInit{

  approvedForm!: FormGroup;
  @Input() coordinator = <any>{};
  isOpen = false;


  constructor(
    private _justiService: JustifileService,
    private _accountService: AccountService, 
    private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    
  }

  openDialog() {
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
  }

  onSubmit() {
    const myCoordinator = {
      fileName: this.coordinator.fileName,
      grade: this.coordinator.grade,
      comment: this.coordinator.comment,
      status: true,
    };
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);

    this._justiService.editJustFile(this.coordinator.id, myCoordinator).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        alert('Successfully Updated');
        this._accountService.userUpdateNeeded.next(myCoordinator);
      },
    });
  }

  onCancel() {
    const myCoordinator = {
      fileName: this.coordinator.fileName,
      grade: this.coordinator.grade,
      comment: this.coordinator.comment,
      status: false,
    };
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);

    this._justiService.editJustFile(this.coordinator.id, myCoordinator).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        alert('Successfully Rejected');
        this._accountService.userUpdateNeeded.next(myCoordinator);
      },
    });
  }

  deleteItem(id: any) {
    this._justiService.deleteJustFile(id).subscribe({
      complete: () => {
        alert('Successfully Deleted')
      }
    })
  }

}
