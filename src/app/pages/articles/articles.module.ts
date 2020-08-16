import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewArticleComponent } from './new-article/new-article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SlideComponent } from './common/slide/slide.component';


@NgModule({
  declarations: [
    NewArticleComponent,
    SlideComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
  ]
})
export class ArticlesModule { }
