import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl, FormBuilder, Validators } from '@angular/forms';


export interface defaultSlideObject {
  order: number,
  media: string,
  content: string,
  tags: Array<number>
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleFormArray: FormArray;
  validLength = 5;

  constructor() { 

  }

  getArticleFormArray() {
    return this.articleFormArray;
  }

  setArticleFormArray(afa: FormArray) {
    this.articleFormArray = afa;
  }

  insertSlide = function (event: number) {
    //-1 because we want the index not the value spliced
    this.orderTracker++;
    const newSlide: defaultSlideObject = {order: event + 1, media: '', content: '', tags:[]};

    // this.articleFormArray.insert(0, new)
  }

  deleteSlide = function (index: number) {

    if (this.articleFormArray.length < 2) {
      return false;
    } else {

      // this.articleFormArray.removeControl('slide'+ event.toString());
      this.articleFormArray.removeAt(index)
      return true;
    }

  }

  getFreshFormGroup(order: number) {
    const mediaFormControl = new FormControl('media' + this.slide.order, [
      Validators.required, 
      Validators.minLength(this.validLength),
      // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    ]);
    const contentFormControl = new FormControl('content' + this.slide.order, [
      Validators.required, 
      Validators.minLength(this.validLength),
    ]);
    const tagsFormControl = new FormControl('tagsControl' + this.slide.order, [
      Validators.required
    ]);
    const orderFormControl = new FormControl('');

    this.media.setValue(this.slide.media);
    this.content.setValue(this.slide.content);
    this.order.setValue(this.slide.order);
    this.tagsControl.setValue(this.slide.tags);
    
    this.slideFormGroup = this.formBuilder.group({
      order: this.order,
      media: this.media,
      content: this.content,
      tags: this.tags
    })

    // this.form.addControl('slide' + this.order.value.toString(), this.slideFormGroup);
    this.form.push(this.slideFormGroup);
  }
}
