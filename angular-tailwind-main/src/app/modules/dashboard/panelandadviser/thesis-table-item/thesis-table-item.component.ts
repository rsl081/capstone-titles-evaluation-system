import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';
import { JustifileService } from 'src/app/core/services/justifile.service';

@Component({
  selector: '[thesis-table-item]',
  templateUrl: './thesis-table-item.component.html',
  styleUrls: ['./thesis-table-item.component.scss'],
})
export class ThesisTableItemComponent implements OnInit {
  
  form: FormGroup;
  @Input() student = <any>{};
  isOpen = false;
  fileId: any;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _justifileService: JustifileService,
  ) {}
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      grade: ['', [Validators.required]],
      comment: ['', [Validators.required]],
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
    this._justifileService.deleteJustFile(id).subscribe({
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
    const { grade, comment } = this.form.value;

    let justifile = {
      fileName: this.student.fileName,
      grade: grade,
      comment: comment,
      status: this.student.status,
    };

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this._justifileService.editJustFile(this.fileId, justifile).subscribe({
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
