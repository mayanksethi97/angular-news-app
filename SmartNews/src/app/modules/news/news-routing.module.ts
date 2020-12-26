import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsHomeComponent } from './components/news-home/news-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: NewsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
