import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastHomeComponent } from './components/podcast-home/podcast-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: PodcastHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule { }
