import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray,  AbstractControl, FormBuilder, Validators } from '@angular/forms';


export interface DefaultSlideObject {
  order: number;
  media: string;
  content: string;
}


export interface DefaultArticleObject {
  title: string;
  slides: FormArray;
  // tags: Array<number>
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleFormGroup: FormGroup;
  private slideFormArray: FormArray;
  private newSlide: DefaultSlideObject = {order: 1, media: '', content: ''};
  private newArticle: DefaultArticleObject;
  private validLength = 5;
  private validArticleTitleLength: 5;

  constructor(private formBuilder: FormBuilder) {
    // this.articleFormArray = new FormArray([]);
    this.slideFormArray = new FormArray([]);
    this.newArticle = {title: '', slides: this.slideFormArray};
  }

  // Article Form Array manipulators
  getArticleFormGroup() {
    return this.articleFormGroup;
  }

  setArticleFormGroup(afg: FormGroup) {
    this.articleFormGroup = afg;
  }

  resetArticleFormGroup() {
    if (this.articleFormGroup) {
      this.articleFormGroup.reset();
    }

    this.articleFormGroup = this.getFreshArticleFormGroup();
  }

  // Slide Form Array manipulators
  getSlideFormArray() {
    return this.slideFormArray;
  }

  setSlideFormArray(afa: FormArray) {
    this.slideFormArray = afa;
  }

  resetSlideFormArray() {
    if (this.slideFormArray) {
      this.slideFormArray.clear();
    }

    this.insertSlide(0, null);
  }

  updateOrdering = function() {
    for (const [i, formgroup] of this.slideFormArray.controls.entries()) {
      formgroup.controls.order.setValue(i + 1);
    }
  };

  insertSlide = function(index: number, presetFormGroup: FormGroup) {

    const newGroup = (!presetFormGroup) ? this.getFreshSlideFormGroup() : presetFormGroup;

    this.slideFormArray.insert(index, newGroup);
    this.updateOrdering();
  };

  moveSlide = function(index: number, direction: number) {
    const formGroup = this.slideFormArray.controls[index];

    this.deleteSlide(index);
    this.insertSlide(index + direction, formGroup);
  };

  deleteSlide = function(index: number) {

    if (this.slideFormArray.length < 2) {
      return false;
    } else {

      this.slideFormArray.removeAt(index);
      this.updateOrdering();
      return true;
    }

  };

  getFreshSlideFormGroup(order: number) {
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

  getFreshArticleFormGroup() {
    const titleFormControl = new FormControl('title', [
      Validators.required,
      Validators.minLength(this.validArticleTitleLength),
    ]);
    const slidesFormArray = new FormArray([]);
    const slidesFormGroup = this.getFreshSlideFormGroup(1);

    titleFormControl.setValue(this.newArticle.title);
    slidesFormArray.insert(0, slidesFormGroup);

    // const articleFormArray: FormGroup;
    const articleFormGroup = this.formBuilder.group({
      title: titleFormControl,
      slides: slidesFormArray,
    });

    // const articleFormArray = new FormArray([titleFormControl, slidesFormArray]);

    return articleFormGroup;
  }
}
