import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  userParse: any;
  userRole: any;

  constructor(
    private _accountService: AccountService,
    private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userRole = this._accountService.getRole();
    this.form = this._formBuilder.group({
      resetPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
          ),
        ],
      ],
    });

    let user = localStorage.getItem('user');
    this.userParse = JSON.parse(user);
    
  }

  get f() {
    return this.form.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    const { resetPassword } = this.form.value;

    let account = {
      id: this.userParse.id,
      password: resetPassword,
    };

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this._accountService.resetPassword(account).subscribe({
      error: (e) => {
        console.log(e)
      }, 
      complete: () => {
        alert('Successfully Reset')
        this.form.reset();
        this.submitted = false;
        // this.form.controls['resetPassword'].setValue('');
      }
    })
  }
}
