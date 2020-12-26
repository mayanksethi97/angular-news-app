import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadioRoutingModule } from './radio-routing.module';
import { RadioHomeComponent } from './components/radio-home/radio-home.component';


@NgModule({
  declarations: [RadioHomeComponent],
  imports: [
    CommonModule,
    RadioRoutingModule
  ]
})
export class RadioModule { }
