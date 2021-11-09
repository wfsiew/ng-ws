import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainIhpComponent } from './main-ihp/main-ihp.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'main-ihp',
    component: MainIhpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
