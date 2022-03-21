import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainNavRoutingModule } from './main-nav-routing.module';
import { AngularHelperLinksComponent } from './angular-helper-links/angular-helper-links.component';
import { CarouselComponent } from '../modules/common-components-module/carousel/carousel.component';



@NgModule({
  declarations: [
    CarouselComponent,
    AngularHelperLinksComponent,
  ],
  imports: [
    MainNavRoutingModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule,
  ]
})
export class MainNavModule { }
