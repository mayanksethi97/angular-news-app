import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsModule } from './modules/news/news.module';
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
    path: 'news', 
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'radio',
    loadChildren: () => import('./modules/radio/radio.module').then(m => m.RadioModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./modules/weather/weather.module').then(m => m.WeatherModule)
  },
  {
    path: 'podcast',
    loadChildren: () => import('./modules/podcast/podcast.module').then(m => m.PodcastModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
