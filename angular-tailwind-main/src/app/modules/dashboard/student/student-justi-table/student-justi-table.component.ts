import { Component, OnInit } from '@angular/core';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { IUser } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[student-justi-table]',
  templateUrl: './student-justi-table.component.html',
  styleUrls: ['./student-justi-table.component.scss'],
})
export class StudentJustiTableComponent implements OnInit {
  public activeStudent: any;
  uploader: FileUploader;
  baseURL = environment.apiUrl;
  userId: any;
  groupId: any;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchCurrentJustiFile();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchCurrentJustiFile();
    });

    this.initializeUploader();
  }

  fetchCurrentJustiFile() {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);
    this._accountService.getCurrentUser(obj.id).subscribe({
      next: (r: any) => {
        this.activeStudent = r.justiFiles.map((r) => r);
        this.userId = r.id;
        this.groupId = r.sections[0].groups[0].id;
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
        url: this.baseURL + 'justification/add-justification/' + id 
          + '/' + this.groupId,
      });
      this.uploader.uploadAll();
    }
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseURL + 'justification/add-justification',
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
