import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FacultyTableComponent } from './components/faculty-table/faculty-table.component';
import { FacultyTableItemComponent } from './components/faculty-table-item/faculty-table-item.component';
import { SchoolTableComponent } from './components/school-table/school-table.component';
import { SchoolTableItemComponent } from './components/school-table-item/school-table-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentJustiTableComponent } from './student/student-justi-table/student-justi-table.component';
import { StudentJustiTableItemComponent } from './student/student-justi-table-item/student-justi-table-item.component';
import { FileUploadModule } from 'ng2-file-upload';
import { HearingTableComponent } from './student/hearing-table/hearing-table.component';
import { HearingTableItemComponent } from './student/hearing-table-item/hearing-table-item.component';
import { ProposalTableComponent } from './components/coordinator/proposal-table/proposal-table.component';
import { ProposalTableItemComponent } from './components/coordinator/proposal-table-item/proposal-table-item.component';
import { AccountModule } from '../account/account.module';
import { ApprovalTableComponent } from './components/coordinator/approval-table/approval-table.component';
import { ApprovalTableItemComponent } from './components/coordinator/approval-table-item/approval-table-item.component';
import { ThesisTableComponent } from './panelandadviser/thesis-table/thesis-table.component';
import { ThesisTableItemComponent } from './panelandadviser/thesis-table-item/thesis-table-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FacultyTableComponent,
    FacultyTableItemComponent,
    SchoolTableComponent,
    SchoolTableItemComponent,
    StudentJustiTableComponent,
    StudentJustiTableItemComponent,
    HearingTableComponent,
    HearingTableItemComponent,
    ProposalTableComponent,
    ProposalTableItemComponent,
    ApprovalTableComponent,
    ApprovalTableItemComponent,
    ThesisTableComponent,
    ThesisTableItemComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    NgApexchartsModule,
    AngularSvgIconModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AccountModule,
  ],
  exports: [
    ApprovalTableComponent,
    ApprovalTableItemComponent,
  ]
})
export class DashboardModule {}
