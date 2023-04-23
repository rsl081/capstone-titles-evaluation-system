import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { SchoolService } from 'src/app/core/services/school.service';

@Component({
  selector: '[assign-table-item]',
  templateUrl: './assign-table-item.component.html',
  styleUrls: ['./assign-table-item.component.scss'],
})
export class AssignTableItemComponent implements OnInit {
  @Input() faculty = <any>{};
  userRole = [];
  group: any;

  isOpen = false;

  isOpenGroupDropDown = false;
  allGrp: any;

  titleGroupDropDown = 'Group';
  groupId: any;

  constructor(private _schoolService: SchoolService, private _accountService: AccountService) {}

  ngOnInit(): void {
    this.userRole = this.faculty.userRoles.map((e) => e);
    this.group = this.faculty.appUserGroups.map((g) => g.groupName);
    this.fetchAllGroup();
  }

  fetchAllGroup() {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);

    this._accountService.getCurrentUser(obj.id).subscribe({
      next: (faculty: any) => {
       
        this.allGrp = faculty.sections[0].groups.map((g) => g); 
        // console.log('qq' + faculty.displayName);
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

  setGroup(g: any) {
    this.titleGroupDropDown = g;
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

  onSubmit() {
    
    let unassignUser = {
      appUserId: this.faculty.id,
      groupId: this.getGroupId(),
    };

    // let id = this.faculty.appUserGroups.map((r) => r.id);
    
    // if (id == '') {
    //   let user = {
    //     appUserId: this.faculty.id,
    //     groupId: this.getGroupId(),
    //   };
    //   this._schoolService.assignGroup(user).subscribe({
    //     error: (e) => {
    //       console.log(e);
    //     },
    //     complete: () => {
    //       this._accountService.userUpdateNeeded.next(this);
    //       this.toggleEditButton();
    //     },
    //   });
    //   return;
    // }

    this._schoolService.assignGroup(unassignUser).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        alert('Successfully Updated');
        this._accountService.userUpdateNeeded.next(this);
        this.toggleEditButton();
      },
    });
  }

}
