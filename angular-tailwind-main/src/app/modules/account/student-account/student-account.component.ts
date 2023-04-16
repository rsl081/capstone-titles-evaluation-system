import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { AccountService } from 'src/app/core/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.scss'],
})
export class StudentAccountComponent implements OnInit {

  //!===================================================
  form: FormGroup;
  submitted = false;
  appUserId: any;
  uploader: FileUploader;
  baseURL = environment.apiUrl;

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.getAppUser();
    this.initializeUploader();
  }

  getAppUser(): void {

    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);

    this._accountService.getCurrentUser(obj.id).subscribe({
      next: (c:any) => {

        this.appUserId = c.id
        // this.appUserId = c.map((r) => r.id);
      },
      error: (error) => console.log(error),
    });

  }

  onSubmit() {
    this.submitted = true;
    const { schoolName, vision, mission } = this.form.value;

    let content = {
      schoolName: schoolName,
      vision: vision,
      mission: mission,
    };

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // this._content.editContent(this.contentId, content).subscribe({
    //   complete: () => {
    //     alert('Successfully Updated');
    //     this.form.reset();
    //     this.submitted = false;
    //   },
    // });
  }

  uploadImage() {
    console.log(this.appUserId)
    this.uploadProfilePhoto('0492a46e-ff70-48cc-98c7-263e25ec7835');
  }

  uploadProfilePhoto(id: any) {
    if (this.uploader.queue.length) {
      this.uploader.setOptions({
        url: this.baseURL + 'account/add-photo/' + id,
      });
      this.uploader.uploadAll();
    }
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseURL + 'account/add-photo',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
    });

    this.uploader.onAfterAddingFile = (file: FileItem) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response) => {
      alert('Successfully Updated');
      console.log(response);
    };

    this.uploader.onErrorItem = (item) => {
      if (!item.isSuccess) {
        console.log('error dudot putaniubta!' + item.onError)
        // this.toaster.error('Upload failed');
      }
    };
  }
}
