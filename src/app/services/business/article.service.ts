import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray,  FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';


export function requiredFileType( types: string ) {
  return (control: FormControl) => {
    const file = control.value;
    const allowedValues = types.toLowerCase();
    const allowedValuesArray = allowedValues.split(',');

    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();

      if (allowedValuesArray.includes(extension.toLowerCase()) ) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }

    return null;
  };
}

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
  tags: Array<number>;
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
  private rft = requiredFileType;
  private validLength = 5;
  private validArticleTitleLength: 5;
  private categories = [
    {id: 1, name: 'Autos & Vehicles'},
    {id: 2, name: 'Music'},
    {id: 3, name: 'Pets & Animals'},
    {id: 4, name: 'Sports'},
    {id: 5, name: 'Travel & Events'},
    {id: 6, name: 'Gaming'},
    {id: 7, name: 'People & Blogs'},
    {id: 8, name: 'Comedy'},
    {id: 9, name: 'Entertainment'},
    {id: 10, name: 'News & Politics'},
    {id: 12, name: 'Howto & Style'},
    {id: 13, name: 'Education'},
    {id: 14, name: 'Science & Technology'},
    {id: 15, name: 'Nonprofits & Activism'}
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    // this.articleFormArray = new FormArray([]);
    this.slideFormArray = new FormArray([]);
    this.newArticle = {title: '', slides: this.slideFormArray, tags: []};
  }

  getCategories(): Array<any> {
    return this.categories;
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

  getValidLength = function() {
    return this.validLength;
  };

  moveSlide = function(index: number, direction: number) {
    const formGroup = this.articleFormGroup.controls.slides.controls[index];
    this.deleteSlide(index);
    this.insertSlide(index + direction, formGroup);

    const textDirection = (direction > 0) ? 'Down' : 'Up';

    // TODO: Creating snackbars from components. Will need to do something similar like modals
    // this._snackBar.openFromComponent(PizzaPartyComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
    this.snackBar.open('Slide ' + (index + 1) + ' moved', textDirection, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
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
    // const mediaFormControl = new FormControl('media', [
    //   Validators.required,
    //   Validators.minLength(this.validLength),
    //    forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    // ]);
    const descriptionFormControl = new FormControl('description', [
      Validators.required,
      Validators.minLength(this.validLength),
    ]);

    const orderFormControl = new FormControl('order');

    // mediaFormControl.setValue(this.newSlide.media);
    descriptionFormControl.setValue(this.newSlide.description);
    orderFormControl.setValue(order);

    const slideFormGroup = this.fb.group({
      order: orderFormControl,
      media: this.fb.control(['media', [Validators.required]]),
      background_audio: this.fb.control(['background_audio', []]),
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

    const articleFormGroup = this.fb.group({
      title: titleFormControl,
      slides: slidesFormArray,
      tags: this.fb.array([]),
      category: this.fb.control(['category', Validators.required]),
      // thumbnail: this.fb.control(['thumbnail', [Validators.required, this.rft('png,jpg,jpeg')]]),
      thumbnail: this.fb.group({
        media: [null, [Validators.required, this.rft('png,jpg,jpeg')]],
      }),
      release_date: this.fb.control(['release_date', Validators.required]),

    });

    return articleFormGroup;
  }
}
