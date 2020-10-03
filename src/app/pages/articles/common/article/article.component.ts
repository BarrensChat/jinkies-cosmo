import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DefaultSlideObject } from '@services/business/article.service';
import { ArticleService } from '@services/business/article.service';
import { OkModalComponent } from '@common/modals/ok-modal/ok-modal.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() articleFormGroup: FormGroup;
  @Input() mode: string;

  slideFormArray: FormArray;

  titleFormControl: FormControl;

  constructor(
    private dialog: MatDialog,
    private articleService: ArticleService
  ) {

   }

  ngOnInit(): void {
    this.articleService.setArticleFormGroup(this.articleFormGroup);

    console.log('----->', this.articleFormGroup);
  }


  insertSlide(index: number) {
    this.articleService.insertSlide(index, null);
  }

  moveSlide(obj) {
    this.articleService.moveSlide(obj.index, obj.direction);
  }

  deleteSlide(event: number) {
    if (!this.articleService.deleteSlide(event - 1)) {
      const modalRef = this.dialog.open(OkModalComponent, {
        data: {title: 'Unable to Delete', content: 'The article must contain at least one slide', buttonText: 'OK'}
      });
    }
  }

  submitArticle() {

    this.articleFormGroup.markAllAsTouched();

    console.log('---submitted article value and form---', this.articleFormGroup.value, this.articleFormGroup);
  }

}
