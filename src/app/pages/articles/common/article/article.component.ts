import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '@services/business/article.service';
import { OkModalComponent } from '@common/modals/ok-modal/ok-modal.component';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() articleFormGroup: FormGroup;
  @Input() mode: string;

  titleFormControl: FormControl;
  thumbnail;

  // tag values
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private dialog: MatDialog,
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {

   }

  ngOnInit(): void {
    this.articleService.setArticleFormGroup(this.articleFormGroup);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {

      this.tags().push(
        this.fb.group({
          name: value.trim()
        })
      );
    }

    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    if (index >= 0) {
      this.tags().removeAt(index);
    }
  }

  slides(): FormArray {
    return this.articleFormGroup.get('slides') as FormArray;
  }

  releaseDate(): FormControl {
    return this.articleFormGroup.get('release_date') as FormControl;
  }

  validLength(): number {
    return this.articleService.getValidLength();
  }

  title(): FormControl {
    return this.articleFormGroup.get('title') as FormControl;
  }

  thubmnail(): FormControl {
    return this.articleFormGroup.get('thumbnail') as FormControl;
  }

  tags(): FormArray {
    return this.articleFormGroup.get('tags') as FormArray;
  }

  category(): FormControl {
    return this.articleFormGroup.get('category') as FormControl;
  }

  categories(): Array<any> {
    return this.articleService.getCategories();
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

}
