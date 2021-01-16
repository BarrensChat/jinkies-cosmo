import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { AllArticlesComponent } from './all-articles/all-articles.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      {
        path: 'new',
        component: NewArticleComponent
      },
      {
        path: 'all',
        component: AllArticlesComponent
      },
      {
        path: 'polly', loadChildren: () => import('../polly/polly.module').then(m => m.PollyModule),
      },
      {
        path: '',
        redirectTo: 'new'
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
