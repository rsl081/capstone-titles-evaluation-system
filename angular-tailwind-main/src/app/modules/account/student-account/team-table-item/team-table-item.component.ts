import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { SchoolService } from 'src/app/core/services/school.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[team-table-item]',
  templateUrl: './team-table-item.component.html',
  styleUrls: ['./team-table-item.component.scss'],
})
export class TeamTableItemComponent implements OnInit {
  @Input() student = <any>{};

  // section: any;

  isOpen = false;

  isOpenGroupDropDown = false;
  isOpenSectionDropDown = false;
  allSection: any;
  allGroup: any;
  titleGroupDropDown = 'Group';
  titleSectionDropDown = 'Section';
  sectionId: any;
  groupId: any;

  constructor(private _schoolService: SchoolService, private _accountService: AccountService) {}

  ngOnInit(): void {
    // this.section = this.student.sections.map((r) => r.name);

    this.fetchAllSection();
  }

  fetchAllSection() {
    this._schoolService.getSection().subscribe({
      next: (section) => {
        this.allSection = section;
      },
    });
  }

  deleteItem(id: any) {
    alert('The page is now refreshing');
    this._schoolService.deleteTeam(id).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        window.location.reload();
      },
    });
  }
  
}
