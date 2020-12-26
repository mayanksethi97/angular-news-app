import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { RouterModule } from '@angular/router';
import { NewsModule } from './modules/news/news.module';
import { RadioModule } from './modules/radio/radio.module';
import { WeatherModule } from './modules/weather/weather.module';
import { PodcastModule } from './modules/podcast/podcast.module';

@NgModule({
  declarations: [
    AppComponent,
    AppLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
