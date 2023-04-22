import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { AccountService } from 'src/app/core/services/account.service';
import { SchoolService } from 'src/app/core/services/school.service';
import { IUser } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[team-table]',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  isOpen = false;

  isOpenGroupDropDown = false;
  isOpenSectionDropDown = false;
  allSection: any;
  allGroup: any;
  titleGroupDropDown = 'Group';
  titleSectionDropDown = 'Section';
  sectionId: any;
  groupId: any;
  studentId: any;

  public activeStudent: any[] = [];

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _schoolService: SchoolService, 
    private _accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchAppUser();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchAppUser();
    });
    this.fetchAllSection();

    this.form = this._formBuilder.group({
      team: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  fetchAllSection() {
    this._schoolService.getSection().subscribe({
      next: (section) => {
        this.allSection = section;
      },
    });
  }

  fetchAppUser() {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);

    this._accountService.getCurrentUser(obj.id).subscribe({
      next: (student: any) => {
        this.activeStudent = student.teams.map((t) => t);
        this.studentId = student.id;
      },
      error: (error) => console.log(error),
    });
  }

  toggleEditButton() {
    this.isOpen = !this.isOpen;
  }

  //* Group
  toggleGroupDropDown() {
    this.isOpenGroupDropDown = !this.isOpenGroupDropDown;
  }

  setGroup(section: any) {
    this.titleGroupDropDown = section;
  }

  setGroupId(id: any) {
    this.groupId = id;
  }

  getGroupId() {
    return this.groupId;
  }

  getGroup() {
    return this.titleGroupDropDown;
  }

  //* Section
  toggleSectionDropDown() {
    this.isOpenSectionDropDown = !this.isOpenSectionDropDown;
  }

  clickSectionButton() {
    this.fetchGroup();
    this.toggleSectionDropDown();
  }

  fetchGroup() {
    console.log(this.getSection());
    this._schoolService.getSpecificSection(this.getSection()).subscribe({
      next: (section) => {
        // console.log('sectn' + section);
        this.allGroup = section[0].groups;
      },
    });
  }

  setSection(section: any) {
    this.titleSectionDropDown = section;
  }

  setSectionId(id: any) {
    this.sectionId = id;
  }
  getSectionId() {
    return this.sectionId;
  }

  getSection() {
    return this.titleSectionDropDown;
  }

  onSubmit() {
    
    const { team } = this.form.value;
    let id = ''
    let myTeam = {
      name: team,
      groupId: this.getGroupId(),
    };

    this._schoolService.addTeam(myTeam).subscribe({
      next:(e) => {
        console.log('e ' + e);
        id = e
      },
      complete: () => {
        alert('Successfully Added!')
        let student = {
          appUserId: this.studentId,
        };

        this._schoolService.assignTeam(id, student)
        .subscribe({
          complete: () => {
            this._schoolService.assignGroup(
              this.groupId, student).subscribe({
              complete: () => {
                this._accountService.userUpdateNeeded.next(this);
                this.toggleEditButton();
              },
              error: (e) => {
                console.log(e);
              },
            });
          },
          error: (e) => {
            console.log(e)
          },
        });
      },
      error: (e) => {
        console.log(e)
      }
    })

  }

}
