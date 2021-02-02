import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewPollyComponent } from './new-polly/new-polly.component';
import { AllPollysComponent } from './all-pollys/all-pollys.component';

const appRoutes: Routes = [
  {
    path: 'new',
    component: NewPollyComponent
  },
  {
    path: 'all',
    component: AllPollysComponent
  },
  {
    path: '',
    component: NewPollyComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [RouterModule]
})
export class PollyRoutingModule { }
