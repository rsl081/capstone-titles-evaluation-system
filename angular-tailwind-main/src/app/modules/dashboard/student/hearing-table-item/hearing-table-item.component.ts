import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';
import { HearingfileService } from 'src/app/core/services/hearingfile.service';
import { JustifileService } from 'src/app/core/services/justifile.service';

@Component({
  selector: '[hearing-table-item]',
  templateUrl: './hearing-table-item.component.html',
  styleUrls: ['./hearing-table-item.component.scss'],
})
export class HearingTableItemComponent implements OnInit {
  
  form: FormGroup;
  @Input() student = <any>{};
  isOpen = false;
  fileId: any;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _hearingfileService: HearingfileService,
  ) {}
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      fileName: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  toggleEditButton() {
    this.isOpen = !this.isOpen;
  }

  setFileId(id: any) {
    this.fileId = id;
  }

  deleteItem(id: any) {
    this._hearingfileService.deleteHearing(id).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        alert('Successfully deleted');
        this._accountService.userUpdateNeeded.next(this.student);
      },
    });
  }

  onSubmit() {
    this.submitted = true;
    const { fileName } = this.form.value;

    let justifile = {
      fileName: fileName,
      grade: this.student.grade,
      comment: this.student.comment,
      status: this.student.status,
    };

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this._hearingfileService.editHearingFile(this.fileId, justifile).subscribe({
      complete: () => {
        alert('Successfully Updated');
        this._accountService.userUpdateNeeded.next(this.student);
        this.form.reset();
        this.submitted = false;
      },
    });
  }

  onDownload() {
    if (this.student) {
      window.open(this.student.url, '_blank');
    } else {
      // this.toaster.error('File not found');
    }
  }
}
