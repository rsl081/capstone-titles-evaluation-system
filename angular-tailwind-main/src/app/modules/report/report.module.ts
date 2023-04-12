import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { JustiTableComponent } from './components/justi-table/justi-table.component';
import { JustiTableItemComponent } from './components/justi-table-item/justi-table-item.component';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [ReportComponent, JustiTableComponent, JustiTableItemComponent],
  imports: [
    CommonModule, 
    ReportRoutingModule, 
    AngularSvgIconModule.forRoot()],
})
export class ReportModule {}
