import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    pathMatch: 'full'
    // children: [
    //   { path: '', redirectTo: 'nfts', pathMatch: 'full' },
    //   { path: 'nfts', component: ContentComponent },
    //   { path: '**', redirectTo: 'error/404' },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
