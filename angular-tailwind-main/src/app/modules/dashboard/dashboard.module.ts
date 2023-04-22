import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NftComponent } from './pages/nft/nft.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { NftSingleCardComponent } from './components/nft/nft-single-card/nft-single-card.component';
import { NftDualCardComponent } from './components/nft/nft-dual-card/nft-dual-card.component';
import { NftChartCardComponent } from './components/nft/nft-chart-card/nft-chart-card.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NftHeaderComponent } from './components/nft/nft-header/nft-header.component';
import { NftAuctionsTableComponent } from './components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftAuctionsTableItemComponent } from './components/nft/nft-auctions-table-item/nft-auctions-table-item.component';
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

@NgModule({
  declarations: [
    DashboardComponent,
    NftComponent,
    NftSingleCardComponent,
    NftDualCardComponent,
    NftChartCardComponent,
    NftHeaderComponent,
    NftAuctionsTableComponent,
    NftAuctionsTableItemComponent,
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
})
export class DashboardModule {}
