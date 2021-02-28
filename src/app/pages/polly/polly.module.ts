import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PollyRoutingModule } from './polly-routing.module';

import { NewPollyComponent } from './new-polly/new-polly.component';
import { AllPollysComponent } from './all-pollys/all-pollys.component';
import { PollyComponent } from './common/polly/polly.component';



@NgModule({
  declarations: [
    NewPollyComponent,
    AllPollysComponent,
    PollyComponent],
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,

    PollyRoutingModule,
    FontAwesomeModule
  ]
})
export class PollyModule { }
