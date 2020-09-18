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

  articleForm = new FormGroup({});
  slideObj: defaultSlideObject = {media: '', content: ''};
  slides = [this.slideObj];

  constructor() { }

  ngOnInit(): void {


  }

  addSlide = function () {
    const newSlide: defaultSlideObject = {media: '', content: ''};
    this.slides.push(newSlide);

    console.log('slide added ->', this.slides);
  }

  deleteSlide = function (event: number) {
    this.slides.splice(event, 1);
    this.articleForm.removeControl('slide'+ event.toString());

    console.log('slides remaining -> ', this.slides, event);
  }

  submitArticle = function () {
    console.log('---article form---', this.articleForm);
  }
}
