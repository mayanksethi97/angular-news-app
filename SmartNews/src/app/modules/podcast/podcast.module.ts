import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastRoutingModule } from './podcast-routing.module';
import { PodcastHomeComponent } from './components/podcast-home/podcast-home.component';


@NgModule({
  declarations: [PodcastHomeComponent],
  imports: [
    CommonModule,
    PodcastRoutingModule
  ]
})
export class PodcastModule { }
