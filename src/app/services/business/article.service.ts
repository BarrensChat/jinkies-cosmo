import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray,  FormBuilder, Validators, Validator } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { VideoFileValidator, AudioFileValidator, ImageFileValidator } from '@classes/validators';
import { HttpRequestService } from '@services/http-request.service';
import { Observable } from 'rxjs';

export interface TableElementColumns {
  created_at: string;
  performance: number;
  user_id: number;
  url: string;
  category: {
    name: string;
  }
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

  private rqArticlesPath = 'articles';
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

  private articleTableHeaders = ['id', 'title', 'state', 'kind', 'live_date'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private hs: HttpRequestService) {
    // this.articleFormArray = new FormArray([]);
    this.slideFormArray = new FormArray([]);
    this.newArticle = {title: '', slides: this.slideFormArray, tags: []};

  }

  getTableHeaders(): Array<any> {
    return this.articleTableHeaders;
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

  getArticlesRequest() {
    return this.hs.getRequest(this.rqArticlesPath);
  }

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
      media: [null, [Validators.required, ImageFileValidator.validate]],
      background_audio: [null, [AudioFileValidator.validate]],
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

      thumbnail: [null, [Validators.required, ImageFileValidator.validate]],
      release_date: this.fb.control(['release_date', Validators.required]),

    });

    return articleFormGroup;
  }
}
