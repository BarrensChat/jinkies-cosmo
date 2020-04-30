import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomainsComponent } from './domains/domains.component';
import { AngularHelperLinksComponent } from './angular-helper-links/angular-helper-links.component';
import { MainNavComponent } from './main-nav.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      {
        path: 'domains',
        component: DomainsComponent
      },
      {
        path: 'helpers',
        component: AngularHelperLinksComponent
      },
      {
        path: '',
        redirectTo: 'domains'
      }
    ]
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
export class MainNavRoutingModule { }