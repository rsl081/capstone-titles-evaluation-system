import { Component, OnInit } from '@angular/core';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { AccountService } from 'src/app/core/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[hearing-table]',
  templateUrl: './hearing-table.component.html',
  styleUrls: ['./hearing-table.component.scss'],
})
export class HearingTableComponent implements OnInit {

  public activeStudent: any;
  uploader: FileUploader;
  baseURL = environment.apiUrl;
  userId: any;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchCurrentHearingFile();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchCurrentHearingFile();
    });

    this.initializeUploader();
  }

  fetchCurrentHearingFile() {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);
    this._accountService.getCurrentUser(obj.id).subscribe({
      next: (r: any) => {
        
        this.activeStudent = r.hearingFiles.map((r) => r);
        this.userId = r.id;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  uploadImage() {
    this.uploadProfilePhoto(this.userId);
  }

  uploadProfilePhoto(id: any) {
    if (this.uploader.queue.length) {
      this.uploader.setOptions({
        url: this.baseURL + 'hearing/add-hearing/' + id,
      });
      this.uploader.uploadAll();
    }
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseURL + 'hearing/add-hearing',
      isHTML5: true,
      allowedFileType: ['pdf', 'docx'],
      removeAfterUpload: true,
      autoUpload: false,
    });

    this.uploader.onAfterAddingFile = (file: FileItem) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response) => {
      alert('Successfully Updated');
      console.log(response);
      this._accountService.userUpdateNeeded.next(this.activeStudent);
    };

    this.uploader.onErrorItem = (item) => {
      if (!item.isSuccess) {
        // this.toaster.error('Upload failed');
      }
    };
  }
}
