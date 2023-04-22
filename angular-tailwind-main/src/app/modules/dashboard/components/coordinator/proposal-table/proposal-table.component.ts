import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { SchoolService } from 'src/app/core/services/school.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[proposal-table]',
  templateUrl: './proposal-table.component.html',
  styleUrls: ['./proposal-table.component.scss'],
})
export class ProposalTableComponent implements OnInit {

  public activeCoordinator: any;
  public sectionName: any;
  groupName: any;
  isDropDownOpen = false;
  activeGroup: any;

  constructor(
    private _schoolService: SchoolService,
    private _accountService: AccountService) {}
  ngOnInit(): void {
    this.fetchAppUser();
    this._accountService.userUpdateNeeded.subscribe(() => {
      this.fetchAppUser();
    });
  }



  fetchAppUser() {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);

    this._accountService.getCurrentUser(obj.id).subscribe({
      next: (student: any) => {
        this.sectionName = student.sections[0].name;
        this.groupName = student.sections[0].groups[0].groupName;
        this.activeCoordinator = student.sections[0].groups[0].justiFiles.map((t) => t);
        this.activeGroup = student.sections[0].groups;
        console.log(this.activeCoordinator);
      },
      error: (error) => console.log(error),
    });
  }

  setGroupName(grpName) {
    this.groupName = grpName;
    this._schoolService.getSpecificGroup(this.groupName)
      .subscribe({
        next:(g) => {

          this.activeCoordinator = g[0].justiFiles;
          console.log('testeqw ' + this.activeCoordinator);
        
        },
        error: (e) => {
          console.log(e)
        }
    })
  }

  getGroupName() {
    return this.groupName;
  }

  toggleDropDown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }
}
