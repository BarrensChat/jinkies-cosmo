import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { defaultSlideObject } from '../common/slide/slide.component';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: [
    './new-article.component.scss'
  ]
})
export class NewArticleComponent implements OnInit {


  slides = [defaultSlideObject];
  // articleData = new FormControl('');
  slideIndex = 1;

  constructor() { }

  ngOnInit(): void {

  }

  addSlide = function () {
    this.slides.push(defaultSlideObject);

    console.log('slides ->', this.slides);
  }

}
