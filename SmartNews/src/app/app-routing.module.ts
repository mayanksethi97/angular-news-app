import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLandingComponent } from './components/app-landing/app-landing.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/app-landing',
    pathMatch: 'full'
  },
  {
    path: 'app-landing',
    component: AppLandingComponent
  },
  {
    path: 'weather',
    loadChildren: () => import('./modules/weather/weather.module').then(m => m.WeatherModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
