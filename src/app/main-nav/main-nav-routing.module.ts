import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularHelperLinksComponent } from './angular-helper-links/angular-helper-links.component';
import { MainNavComponent } from './main-nav.component';
import { ContactComponent } from 'app/pages/contact/contact.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      // {
      //   path: 'helpers',
      //   component: AngularHelperLinksComponent
      // },
      {
        path: 'contact',
        component: ContactComponent
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
