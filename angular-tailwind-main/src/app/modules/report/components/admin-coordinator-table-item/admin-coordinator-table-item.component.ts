import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { SchoolService } from 'src/app/core/services/school.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[admin-coordinator-table-item]',
  templateUrl: './admin-coordinator-table-item.component.html',
  styleUrls: ['./admin-coordinator-table-item.component.scss'],
})
export class AdminCoordinatorTableItemComponent implements OnInit {
  @Input() faculty = <any>{};
  userRole = [];
  section: any;

  isOpen = false;

  isOpenYearDropDown = false;
  isOpenSectionDropDown = false;
  allSection = [];
  allYear: any;
  titleYearDropDown = 'Year';
  titleSectionDropDown = 'Section';
  sectionId: any;
  yearId: any;

  constructor(private _schoolService: SchoolService, private _accountService: AccountService) {}

  ngOnInit(): void {
    this.userRole = this.faculty.userRoles.map((e) => e);
    this.section = this.faculty.appUserSections.map((r) => r.name);

    this.fetchAllSY();
  }

  fetchAllSY() {
    this._schoolService.getSchoolYear().subscribe({
      next: (year) => {
        this.allYear = year;
      },
    });
  }

  toggleEditButton() {
    this.isOpen = !this.isOpen;
  }

  //* School Year
  toggleYearDropDown() {
    this.isOpenYearDropDown = !this.isOpenYearDropDown;
  }
  
  clickYearButton() {

    this.fetchSection();
    this.toggleYearDropDown();
  }

  setYear(section: any) {
    this.titleYearDropDown = section;
  }

  setYearId(id: any) {
    this.yearId = id;
  }

  getYearId() {
    return this.yearId;
  }

  getYear() {
    return this.titleYearDropDown;
  }

  //* Section
  toggleSectionDropDown() {
    this.isOpenSectionDropDown = !this.isOpenSectionDropDown;
  }

  fetchSection() {
    this._schoolService.getSpecificSchoolYear(this.getYear()).subscribe({
      next: (year) => {
        this.allSection = year[0].sections;
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
    alert('Successfully Updated');

    let unassignCoordinator = {
      appUserId: null,
      sectionId: null,
    };

    let id = this.faculty.appUserSections.map((r) => r.id);

    if (id == '') {
      let coordinator = {
        appUserId: this.faculty.id,
        sectionId: this.getSectionId(),
      };
      this._schoolService.assignSection(coordinator).subscribe({
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this._accountService.userUpdateNeeded.next(this);
          this.toggleEditButton();
        },
      });
      return;
    }

    this._schoolService.assignSection(unassignCoordinator).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        let coordinator = {
          appUserId: this.faculty.id,
          sectionId: this.getSectionId(),
        };
        this._schoolService.assignSection(coordinator).subscribe({
          error: (e) => {
            console.log(e);
          },
          complete: () => {
            this._accountService.userUpdateNeeded.next(this);
            this.toggleEditButton();
          },
        });
      },
    });
  }
}
