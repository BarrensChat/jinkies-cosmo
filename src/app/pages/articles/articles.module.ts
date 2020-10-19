import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
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

import { ArticlesRoutingModule } from './articles-routing.module';

import { NewArticleComponent } from './new-article/new-article.component';
import { SlideComponent } from './common/slide/slide.component';
import { ArticleComponent } from './common/article/article.component';
import { FileUploadComponent } from '@components/inputs/file-upload/file-upload.component';


@NgModule({
  declarations: [
    NewArticleComponent,
    SlideComponent,
    ArticleComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    MatButtonModule,
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

    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
