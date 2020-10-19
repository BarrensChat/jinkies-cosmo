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

  payload: string;

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

  //   console.log('====', this.releaseDate());
  //   this.articleService.setArticleFormGroup(this.articleFormGroup);
  //   const yeet = this.articleService.getArticleFormGroup();
  //   yeet.get('thumbnail').setValue('yeeeting');
  //   this.articleFormGroup.markAllAsTouched();

  //   const jaja = this.articleService.getArticleFormGroup();
  //   console.log('---submitted article value and form---', jaja.value, jaja);

    this.payload = JSON.stringify(this.articleFormGroup.value, undefined, 2);
    console.log('---submitted article value and form---', this.articleFormGroup.value, this.articleFormGroup);
  }

}
