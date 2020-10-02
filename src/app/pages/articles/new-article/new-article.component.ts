import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { defaultSlideObject } from '@services/business/article.service';
import { ArticleService } from '@services/business/article.service';
import { OkModalComponent } from '@common/modals/ok-modal/ok-modal.component';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: [
    './new-article.component.scss'
  ]
})
export class NewArticleComponent implements OnInit {

  articleFormArray = new FormArray([]);
  slideObj: defaultSlideObject = {
    order: 1,
    media: '',
    content: '',
    // tags: []
  };

  orderTracker = 1;

  constructor(
    private dialog: MatDialog,
    private articleService: ArticleService
  ) {

   }

  ngOnInit(): void {
    this.articleService.resetArticleFormArray();
    this.articleFormArray = this.articleService.getArticleFormArray();
  }


  insertSlide = function(order: number) {
    this.articleService.insertSlide(order);
  };

  deleteSlide = function(event: number) {
    if (!this.articleService.deleteSlide(event - 1)) {
      const modalRef = this.dialog.open(OkModalComponent, {
        data: {title: 'Unable to Delete', content: 'The article must contain at least one slide', buttonText: 'OK'}
      });
    }
  };

  submitArticle = function() {

    this.articleFormArray.markAllAsTouched();

    console.log('---submitted article value and form---', this.articleFormArray.value, this.articleFormArray);
  };

}
