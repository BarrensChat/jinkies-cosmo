import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { defaultSlideObject } from '../common/slide/slide.component';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: [
    './new-article.component.scss'
  ]
})
export class NewArticleComponent implements OnInit {

  public articleForm = new FormGroup({

  });
  slideObj: defaultSlideObject = {media: 'jaja', content: 'yeet'};
  slides = [this.slideObj];

  constructor() { }

  ngOnInit(): void {

  }

  addSlide = function () {
    this.slides.push(this.slideObj);

    console.log('slide added ->', this.slides);
  }

  deleteSlide = function (event: number) {
    this.slides.splice(event, 1);

    console.log('slides left -> ', this.slides, event);
  }

  submitArticle = function (form) {

  }
}
