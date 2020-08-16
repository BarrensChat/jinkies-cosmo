import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: [
    './new-article.component.scss'
  ]
})
export class NewArticleComponent implements OnInit {

  slides = [];
  articleData = new FormControl('');
  slideIndex = 1;

  constructor() { }

  ngOnInit(): void {

  }


}
