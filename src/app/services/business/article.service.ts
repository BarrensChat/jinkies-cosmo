import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray,  AbstractControl, FormBuilder, Validators } from '@angular/forms';


export interface DefaultSlideObject {
  order: number;
  media: string;
  description: string;
  tags: [];
}

export interface DefaultTagsObject {
  name: string;
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
  private newTags: DefaultTagsObject[] = [
    {name: 'meme'},
    {name: 'anime'},
    {name: 'polital'},
  ];
  private newSlide: DefaultSlideObject = {order: 1, media: '', description: '', tags: []};
  private newArticle: DefaultArticleObject;
  private validLength = 5;
  private validArticleTitleLength: 5;
  private categories = {
    1: 'Film & Animation',
    2: 'Autos & Vehicles',
    3: 'Music',
    4: 'Pets & Animals',
    5: 'Sports',
    6: 'Travel & Events',
    7: 'Gaming',
    8: 'People & Blogs',
    9: 'Comedy',
    10: 'Entertainment',
    11: 'News & Politics',
    12: 'Howto & Style',
    13: 'Education',
    14: 'Science & Technology',
    15: 'Nonprofits & Activism'
  }

  constructor(private fb: FormBuilder) {
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
    return this.articleFormGroup.controls.slides;
  }

  setSlideFormArray(afa: FormArray) {
    this.articleFormGroup.controls.slides = afa;
  }

  getCategories = function() {
    return this.categories;
  }

  // resetSlideFormArray() {
  //   if (this.slideFormArray) {
  //     this.slideFormArray.clear();
  //   }

  //   this.insertSlide(0, null);
  // }

  updateOrdering = function() {
    for (const [i, formgroup] of this.articleFormGroup.controls.slides.controls.entries()) {
      formgroup.controls.order.setValue(i + 1);
    }
  };

  insertSlide = function(index: number, presetFormGroup: FormGroup) {

    const newGroup = (!presetFormGroup) ? this.getFreshSlideFormGroup() : presetFormGroup;

    this.articleFormGroup.controls.slides.insert(index, newGroup);
    this.updateOrdering();
  };

  moveSlide = function(index: number, direction: number) {
    const formGroup = this.articleFormGroup.controls.slides.controls[index];

    this.deleteSlide(index);
    this.insertSlide(index + direction, formGroup);
  };

  deleteSlide = function(index: number) {

    if (this.articleFormGroup.controls.slides.length < 2) {
      return false;
    } else {

      this.articleFormGroup.controls.slides.removeAt(index);
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
    const descriptionFormControl = new FormControl('description', [
      Validators.required,
      Validators.minLength(this.validLength),
    ]);

    const orderFormControl = new FormControl('order');

    mediaFormControl.setValue(this.newSlide.media);
    descriptionFormControl.setValue(this.newSlide.description);
    orderFormControl.setValue(order);

    const slideFormGroup = this.fb.group({
      order: orderFormControl,
      media: mediaFormControl,
      description: descriptionFormControl,
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
    // tagsFormGroup.setValue(this.newTags)

    const articleFormGroup = this.fb.group({
      title: titleFormControl,
      slides: slidesFormArray,
      tags: this.fb.array([]),
    });

    return articleFormGroup;
  }
}
