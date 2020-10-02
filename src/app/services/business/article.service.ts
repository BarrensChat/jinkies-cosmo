import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray,  AbstractControl, FormBuilder, Validators } from '@angular/forms';


export interface defaultSlideObject {
  order: number,
  media: string,
  content: string,
  // tags: Array<number>
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleFormArray: FormArray;
  private newSlide: defaultSlideObject = {order: 1, media: '', content: ''};
  validLength = 5;

  constructor(private formBuilder: FormBuilder) {
    this.articleFormArray = new FormArray([]);
  }

  getArticleFormArray() {
    return this.articleFormArray;
  }

  setArticleFormArray(afa: FormArray) {
    this.articleFormArray = afa;
  }

  resetArticleFormArray() {
    if (this.articleFormArray) {
      this.articleFormArray.clear();
    }

    this.insertSlide(0, null);
  }

  updateOrdering = function() {
    for (const [i, formgroup] of this.articleFormArray.controls.entries()) {
      formgroup.controls.order.setValue(i + 1);
    }
  };

  insertSlide = function(event: number, presetFormGroup: FormGroup) {

    const newGroup = (!presetFormGroup) ? this.getFreshFormGroup() : presetFormGroup;

    this.articleFormArray.insert(event, newGroup);
    this.updateOrdering();
  };

  moveSlide = function(index: number, direction: number) {
    const formGroup = this.articleFormArray.controls[index];
console.log('---form group ->', formGroup, index, index + direction);
    this.deleteSlide(index);
    this.insertSlide(index + direction, formGroup);
  };

  deleteSlide = function(index: number) {

    if (this.articleFormArray.length < 2) {
      return false;
    } else {

      this.articleFormArray.removeAt(index);
      this.updateOrdering();
      return true;
    }

  };

  getFreshFormGroup(order: number) {
    const mediaFormControl = new FormControl('media', [
      Validators.required,
      Validators.minLength(this.validLength),
      // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    ]);
    const contentFormControl = new FormControl('content', [
      Validators.required,
      Validators.minLength(this.validLength),
    ]);
    // const tagsFormControl = new FormControl('tagsControl' + this.slide.order, [
    //   Validators.required
    // ]);
    const orderFormControl = new FormControl('order');

    mediaFormControl.setValue(this.newSlide.media);
    contentFormControl.setValue(this.newSlide.content);
    orderFormControl.setValue(order);

    const slideFormGroup = this.formBuilder.group({
      order: orderFormControl,
      media: mediaFormControl,
      content: contentFormControl
    });

    return slideFormGroup;
  }
}
