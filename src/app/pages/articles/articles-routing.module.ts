import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { NewArticleComponent } from './new-article/new-article.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      {
        path: 'new',
        component: NewArticleComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }