import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { SchoolService } from 'src/app/core/services/school.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isOpen = false;
  isOpenSectionDropDown = false;
  isOpenGroupDropDown = false;
  grpName = 'Group';
  groupId: any;

  registerForm: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  sections: any;
  groups: any;
  sectionName = 'Section';
  sectionId: any;

  isPulse = false;
  roleIndicators = [
    { user: 'Faculty', active: true },
    { user: 'Student', active: false },
  ];
  userType = this.roleIndicators[0].user; // default

  constructor(
    private _schoolService: SchoolService,
    private _formbuilder: FormBuilder,
    private _accountService: AccountService,
    // private _toastr: ToastrService,
    private readonly _router: Router,
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.fetchAllSection();
  }

  toggleBtn(user: string) {
    this.isPulse = true;
    this.userType = user;
    this.roleIndicators.forEach((roleIndicator) => {
      if (roleIndicator.user === user) {
        roleIndicator.active = true;
      } else {
        roleIndicator.active = false;
      }
    });
    if (this.userType === 'Faculty') {
      this.registerForm.controls['expertise'].addValidators([Validators.required]);
    }
    if (this.userType === 'Student') {
      this.registerForm.controls['expertise'].removeValidators([Validators.required]);
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  setActiveTabToFalse() {
    this.isPulse = false;
  }

  getActiveTab(): Boolean {
    return this.isPulse;
  }

  getActiveUser(): String {
    return this.userType;
  }

  createRegisterForm() {
    this.registerForm = this._formbuilder.group({
      name: [null, [Validators.required, Validators.pattern('^([A-Za-z0-9]\\s?)+([,]\\s?([A-Za-z0-9]\\s?)+)*$')]],

      expertise: [null, [Validators.pattern('^([A-Za-z0-9]\\s?)+([,]\\s?([A-Za-z0-9]\\s?)+)*$')]],

      email: [
        null,
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        // [this.validateEmailNotTaken()],
      ],

      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
          ),
        ],
      ],

      confirmpassword: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    const { name, expertise, email, password, confirmpassword } = this.registerForm.value;

    if (password !== confirmpassword) {
      this.registerForm.controls['confirmpassword'].setErrors({
        invalid: 'Password and Confirm password did not match',
      });
      return;
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.getActiveUser() === 'Faculty') {
      let credentials = {
        displayName: name,
        expertise: expertise,
        email: email,
        password: password,
      };

      this._accountService.registerFaculty(credentials).subscribe({
        // error: () => this.toaster.error('Unauthorized'),
        complete: () => {
          alert('Successfully Registered');
          this._router.navigate(['/sign-in']);
        },
      });
    }

    if (this.getActiveUser() === 'Student') {
      let credentials = {
        displayName: name,
        email: email,
        password: password,
      };

      this._accountService.registerStudent(credentials).subscribe({
        // error: () => this.toaster.error('Unauthorized'),
        next: (user) => {
          let grp = {
            appUserId: user.id,
            groupId: this.getGroupId(),
          };
          this._schoolService.assignGroup(grp).subscribe({
            complete: () => {
              alert('Successfully Registered');
              this._router.navigate(['/sign-in']);
            }
          })
          // console.log('tst' + user.id)
        },
       
      });
    }
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  //*==================== Section=================
  setSection(sectionName: any) {
    this.sectionName = sectionName;
  }
  setSectionId(sectionId: any) {
    this.sectionId = sectionId;
  }

  getSection() {
    return this.sectionName;
  }

  fetchAllSection() {
    this._schoolService.getSection().subscribe({
      next: (s) => {
        this.sections = s;
      },
    });
  }

  toggleDropDownBtn() {
    this.isOpen = !this.isOpen;
  }

  toggleSectionDropDown() {
    this.isOpenSectionDropDown = !this.isOpenSectionDropDown;
  }

  clickSectionButton() {
    this.toggleSectionDropDown();
    this.fetchSelectedSectionWithGroup();
  }

  fetchSelectedSectionWithGroup() {
    this._schoolService.getSpecificSection(this.getSection()).subscribe({
      next: (r) => {
        this.groups = r[0].groups.map((r) => r);
        // this.groups = r.map((g) => g.groups.map((r) => r.groupName));
        // console.log(this.groups.map(g => g.map(grp => grp)));
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  //*====================Group=================
  setGroup(grpName: any) {
    this.grpName = grpName;
  }
  setGroupId(groupId: any) {
    this.groupId = groupId;
  }

  getGroupId() {
    return this.groupId;
  }

  getGroup() {
    return this.grpName;
  }

  toggleGroupDropDown() {
    this.isOpenGroupDropDown = !this.isOpenGroupDropDown;
  }

  onSelect() {
    // this._schoolService.assignGroup()
    this.toggleDropDownBtn();
  }

}
