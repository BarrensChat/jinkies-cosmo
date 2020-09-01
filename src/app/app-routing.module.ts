import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { environment } from './../environments/environment';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'lander',
    component: LandingComponent,
  },
  {
    path: 'articles', loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'menu', loadChildren: () => import('./main-nav/main-nav.module').then(m => m.MainNavModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: environment.tracing } // <-- debugging purposes only (console logs everything)
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }