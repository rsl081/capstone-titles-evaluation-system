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
  @Input() faculty = <IUser>{};
  userRole = [];
  section: any;
  isOpen = false;
  isOpenDropDown = false;
  allSection = [];
  titleDropDown = "Choose";
  sectionId: any;
  
  

  constructor(
    private _schoolService: SchoolService,
    private _accountService: AccountService){}

  ngOnInit(): void {
    this.userRole = this.faculty.userRoles.map((e) => e);
    this.section = this.faculty.sections.map((r) => r.name);
 
    this.fetchAllSection();
   
  }

  fetchAllSection() {
    this._schoolService.getSection().subscribe({
      next: (section) => {
        this.allSection = section;
      }
    });
  }

  toggleEditButton() {
    this.isOpen = !this.isOpen;
  }

  toggleDropDown() {
    this.isOpenDropDown = !this.isOpenDropDown;
  }

  setSection(section: any) {
    this.titleDropDown = section
  }

  setSectionId(id: any) {
    this.sectionId = id;
  }
  getSectionId(){
    return this.sectionId;
  }

  getSection() {
    return this.titleDropDown;
  }
  qwe: [];
  onSubmit() {
    alert('Successfully Updated');
    
    let unassignCoordinator = {
      appUserId: null,
    };
    
    let id = this.faculty.sections.map((r) => r.id);
    

    if(id == '') {
      let coordinator = {
        appUserId: this.faculty.id,
      };
      this._schoolService.assignSection(this.getSectionId(), 
        coordinator).subscribe({
        error: (e) => {
          console.log(e);
        },
        complete: () => {

          this._accountService.userUpdateNeeded.next(this);
          this.toggleEditButton();
        }
      });
      return
    }

    this._schoolService.assignSection(id, 
      unassignCoordinator).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        
            let coordinator = {
              appUserId: this.faculty.id,
            };
            this._schoolService.assignSection(this.getSectionId(), coordinator).subscribe({
              error: (e) => {
                console.log(e);
              },
              complete: () => {

                this._accountService.userUpdateNeeded.next(this)
                this.toggleEditButton();

              }
            });

      },
    });


  }

}
