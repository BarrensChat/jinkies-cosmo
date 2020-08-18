import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArticlesRoutingModule } from './articles-routing.module';

import { NewArticleComponent } from './new-article/new-article.component';
import { SlideComponent } from './common/slide/slide.component';



@NgModule({
  declarations: [
    NewArticleComponent,
    SlideComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    ArticlesRoutingModule,
  ]
})
export class ArticlesModule { }
