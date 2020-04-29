import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { HeaderComponent } from './header/header.component';
// import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { DomainsComponent } from './domains/domains.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainNavRoutingModule } from './main-nav-routing.module';
import { AngularHelperLinksComponent } from './angular-helper-links/angular-helper-links.component';
import { CarouselComponent } from '../common-components/carousel/carousel.component';



@NgModule({
  declarations: [
    CarouselComponent,
    AngularHelperLinksComponent,
    DomainsComponent,
  ],
  imports: [
    MainNavRoutingModule,
    CommonModule,
    NgbModule,
    // LayoutModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSliderModule,
    MatChipsModule,
    MatRippleModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule
  ]
})
export class MainNavModule { }
