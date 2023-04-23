import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { JustiTableComponent } from './components/justi-table/justi-table.component';
import { JustiTableItemComponent } from './components/justi-table-item/justi-table-item.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCoordinatorTableComponent } from './components/admin-coordinator-table/admin-coordinator-table.component';
import { AdminCoordinatorTableItemComponent } from './components/admin-coordinator-table-item/admin-coordinator-table-item.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { TeacherTableItemComponent } from './components/teacher-table-item/teacher-table-item.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AssignTableComponent } from './components/coordinator/assign-table/assign-table.component';
import { AssignTableItemComponent } from './components/coordinator/assign-table-item/assign-table-item.component';

@NgModule({
  declarations: [
    ReportComponent,
    JustiTableComponent,
    JustiTableItemComponent,
    TeacherTableComponent,
    TeacherTableItemComponent,
    AdminCoordinatorTableComponent,
    AdminCoordinatorTableItemComponent,
    AssignTableComponent,
    AssignTableItemComponent,
  ],
  imports: [
    CommonModule, ReportRoutingModule, 
    AngularSvgIconModule.forRoot(), 
    FormsModule, 
    ReactiveFormsModule,
    DashboardModule,
  ],
})
export class ReportModule {}
