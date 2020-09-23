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
  slideObj: defaultSlideObject = {
    order: 1,
    media: '', 
    content: ''
  };
  slides = [this.slideObj];
  orderTracker = 1;

  constructor() { }

  ngOnInit(): void {


  }

  addSlide = function () {
    this.orderTracker++;
    const newSlide: defaultSlideObject = {order: this.orderTracker, media: '', content: ''};
    this.slides.push(newSlide);
    console.log('slide added ->', this.slides);
  }

  deleteSlide = function (event: number) {

    //-1 because we want the index not the value spliced
    this.slides.splice(event-1, 1);
    this.articleForm.removeControl('slide'+ event.toString());
    
    this.orderTracker--;
    console.log('slides remaining -> ', this.slides, event);
  }

  submitArticle = function () {
    console.log('---article form---', this.articleForm.value);
  }
}
