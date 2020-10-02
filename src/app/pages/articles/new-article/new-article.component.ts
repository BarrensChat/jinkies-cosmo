import { Component, OnInit } from '@angular/core';
import { FormArray} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '@services/business/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: [
    './new-article.component.scss'
  ]
})
export class NewArticleComponent implements OnInit {

  articleFormArray = new FormArray([]);


  constructor(
    private dialog: MatDialog,
    private articleService: ArticleService
  ) {

   }

  ngOnInit(): void {
    this.articleService.resetArticleFormArray();
    this.articleFormArray = this.articleService.getArticleFormArray();
  }

  submitArticle() {

    this.articleFormArray.markAllAsTouched();

    console.log('---submitted article value and form---', this.articleFormArray.value, this.articleFormArray);
  }

}
