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
import { ArticlesRoutingModule } from './articles-routing.module';

import { NewArticleComponent } from './new-article/new-article.component';
import { SlideComponent } from './common/slide/slide.component';
import { ArticleComponent } from './common/article/article.component';


@NgModule({
  declarations: [
    NewArticleComponent,
    SlideComponent,
    ArticleComponent,
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
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
