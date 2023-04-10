import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'content',
    component: LayoutComponent,
    loadChildren: () => import('../content/content.module').then((m) => m.ContentModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'content', component: ContentComponent},
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
