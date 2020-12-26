import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RadioHomeComponent } from './components/radio-home/radio-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: RadioHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioRoutingModule { }
