import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ContentService } from 'src/app/core/services/content.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  contentId: any;
  uploader: FileUploader;
  baseURL = environment.apiUrl;

  constructor(private _content: ContentService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      schoolName: ['', [Validators.required]],
      vision: ['', [Validators.required]],
      mission: ['', [Validators.required]],
    });

    this.getContent();
    this.initializeUploader();
  }

  getContent(): void {
    this._content.getContent().subscribe({
      next: (c) => {
        this.contentId = c.map((r) => r.id);
      },
      error: (error) => alert(error.message),
    });
  }

  get f() {
    return this.form.controls;
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

    this._content.editContent(this.contentId, content).subscribe({
      complete: () => {
        
        alert('Successfully Updated');
        this.form.reset();
        this.submitted = false;
      },
    });
  }

  uploadImage() {
    this.uploadProfilePhoto(this.contentId);
  }

  uploadProfilePhoto(id: any) {
    if (this.uploader.queue.length) {
      this.uploader.setOptions({
        url: this.baseURL + 'contents/add-photo/' + id,
      });
      this.uploader.uploadAll();
    }
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseURL + 'contents/add-photo',
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
        // this.toaster.error('Upload failed');
      }
    };
  }
}
