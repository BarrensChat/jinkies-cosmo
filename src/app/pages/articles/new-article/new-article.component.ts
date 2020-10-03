import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
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

  articleFormGroup: FormGroup;

  constructor(
    private dialog: MatDialog,
    private articleService: ArticleService
  ) {

   }

  ngOnInit(): void {
    this.articleService.resetArticleFormGroup();
    this.articleFormGroup = this.articleService.getArticleFormGroup();
  }

  submitArticle() {

    this.articleFormGroup.markAllAsTouched();

    console.log('---submitted article value and form---', this.articleFormGroup.value, this.articleFormGroup);
  }

}
