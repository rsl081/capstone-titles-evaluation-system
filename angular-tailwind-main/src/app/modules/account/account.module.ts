import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentAccountComponent } from './student-account/student-account.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TeamTableComponent } from './student-account/team-table/team-table.component';
import { TeamTableItemComponent } from './student-account/team-table-item/team-table-item.component';


@NgModule({
  declarations: [
    AccountComponent,
    StudentAccountComponent,
    TeamTableComponent,
    TeamTableItemComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AngularSvgIconModule.forRoot(), 
    FormsModule, 
    ReactiveFormsModule,
    FileUploadModule,
  ],
  exports: [
    TeamTableComponent,
    TeamTableItemComponent,
  ]
})
export class AccountModule { }
