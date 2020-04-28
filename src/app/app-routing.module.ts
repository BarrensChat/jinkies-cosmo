import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { environment } from './../environments/environment';

const appRoutes: Routes = [

  // You can navigate inside an auxiliary outlet by using the outlets property:
  
  // router.navigate([{outlets: {primary: 'path' ,sidebar: 'path'}}]);
  // Or also using the routerLink directive
  
  
  // <a [routerLink]="[{ outlets: { primary: ['path'],sidebar: ['path'] } }]">
  //     Products List
  // </a>
    // { path: 'hero/:id',      component: HeroDetailComponent },
    // {
    //   path: 'heroes',
    //   component: HeroListComponent,
    //   data: { title: 'Heroes List' }
    // }, 
    // { path: '',
    //   redirectTo: '/heroes',
    //   pathMatch: 'full'
    // },
    { path: '',
      component: LandingComponent,
    },
    { path: 'menu', loadChildren: () => import('./main-nav/main-nav.module').then(m => m.MainNavModule) },
    //component: MainNavComponent },

    // { path: '**', component: PageNotFoundComponent }
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