import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

// Tool modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

// Stand alone files
import { VideoFileValidator, ImageFileValidator, AudioFileValidator } from './common-classes/validators';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MoonQuizDialogComponent } from './pages/landing/moon-quiz-dialog/moon-quiz-dialog.component';
import { SerializerService } from './services/serializer.service';
import { UrlSerializer } from '@angular/router';
import { OkModalComponent } from './common-components/modals/ok-modal/ok-modal.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ConfirmModalComponent } from './common-components/modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainNavComponent,
    PageNotFoundComponent,
    LandingComponent,
    MoonQuizDialogComponent,
    OkModalComponent,
    ContactComponent,
    LoginComponent,
    ArticlesComponent,
    ConfirmModalComponent,

    // stand alone files
    VideoFileValidator,
    ImageFileValidator,
    AudioFileValidator
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSliderModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatMenuModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
             allowedDomains: ['http://localhost:4200/', 'https://jinkiescosmo.com'],
             disallowedRoutes: ['http://localhost:4200/articles']
      }
    }),
  ],
  providers: [
    {
      provide: UrlSerializer,
      useClass: SerializerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
