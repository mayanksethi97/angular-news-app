import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherHomeComponent } from './components/weather-home/weather-home.component';


@NgModule({
  declarations: [WeatherHomeComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
