import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule, 
    ContentRoutingModule, 
    AngularSvgIconModule.forRoot(), 
    FormsModule,
    ReactiveFormsModule],
})
export class ContentModule {}
