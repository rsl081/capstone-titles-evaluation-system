import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/core/services/school.service';

@Component({
  selector: '[school-table]',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss'],
})
export class SchoolTableComponent implements OnInit {
  isOpenYearDialog = false;
  isOpenSectionDialog = false;

  addYearForm: FormGroup;
  addSectionForm: FormGroup;

  public activeSchool: any[] = [];
  public activeSY = [];
  isDropDownOpen = false;
  year: string;
  yearId: string;

  constructor(private _formBuilder: FormBuilder, private _schoolService: SchoolService) {}

  ngOnInit(): void {
    this.addYearForm = this._formBuilder.group({
      schoolYear: ['', Validators.required],
    });

    this.addSectionForm = this._formBuilder.group({
      sectionName: ['', Validators.required],
      sectionGroup: ['', Validators.required],
    });

    this.fetchSchoolYear();
    this._schoolService.schoolUpdateNeeded.subscribe(() => {
      this.setYear(this.year);
    });

  }

  setYear(sy: string) {
    this.year = sy;

    // if (this._schoolService.getSpecificSchoolYear != null) {
    //   this.activeSchool = [];
    // }

    this._schoolService.getSpecificSchoolYear(this.year).subscribe({
      next: (school) => {
        school.map((s) => (this.yearId = s.id));
        
        this.activeSchool = school[0].sections;

        // school.map((s) =>
        //   s.sections.map((r) => {
        //     // this.activeSchool = [];
        //     this.activeSchool.push(r);
        //   }),
        // );
      },
      error: (error) => alert(error.message),
      complete: () => {
        this.toggleDropDown();
      },
    });

  }

  toggleDropDown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  toggleYearDialog() {
    this.isOpenYearDialog = !this.isOpenYearDialog;
  }

  toggleSectionDialog() {
    this.isOpenSectionDialog = !this.isOpenSectionDialog;
  }

  fetchSchoolYear(): void {
    this._schoolService.getSchoolYear().subscribe({
      next: (school) => {
        this.year = school[0].schoolYear;
        this.activeSY = school;
        this.yearId = school[0].id;

        this.activeSchool = school[0].sections;

        // school[0].sections.map((r) => {
        //   console.log(this.activeSchool);
        // });
      },
      error: (error) => alert(error.message),
    });
  }

  onSubmit() {
    const { schoolYear } = this.addYearForm.value;

    const sy = {
      schoolYear: schoolYear,
    };

    // stop here if form is invalid
    if (this.addYearForm.invalid) {
      return;
    }

    this._schoolService.addSchoolYear(sy).subscribe({
      complete: () => {
        // window.location.reload();
        this._schoolService.schoolUpdateNeeded.next(sy);
        this.toggleYearDialog();
      },
    });

  }

  onSubmitSection() {
     const { sectionName, sectionGroup } = this.addSectionForm.value;

     const section = {
       name: sectionName,
       group: sectionGroup,
       schoolId: this.yearId,
     };
    
     // stop here if form is invalid
     if (this.addSectionForm.invalid) {
       return;
     }

     this._schoolService.addSection(section).subscribe({
       complete: () => {
         // window.location.reload();
         this._schoolService.schoolUpdateNeeded.next(section);
         this.toggleSectionDialog();
       },
     });

  }

}
