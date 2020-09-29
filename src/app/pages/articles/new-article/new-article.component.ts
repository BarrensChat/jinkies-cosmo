import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OkModalComponent } from '@common/modals/ok-modal/ok-modal.component';
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
    content: '',
    tags: []
  };
  slides = [this.slideObj];
  orderTracker = 1;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {


  }

  addSlide = function () {
    this.orderTracker++;
    const newSlide: defaultSlideObject = {order: this.orderTracker, media: '', content: '', tags: []};
    this.slides.push(newSlide);
  }

  deleteSlide = function (event: number) {

    if (this.slides.length < 2) {
      const modalRef = this.dialog.open(OkModalComponent, {
        data: {title: 'Unable to Delete', content: 'The article must contain at least one slide', buttonText: 'OK'}
      });
    } else {

      //-1 because we want the index not the value spliced
      this.slides.splice(event-1, 1);
      this.articleForm.removeControl('slide'+ event.toString());
      
      this.orderTracker--;
      console.log('slides remaining -> ', this.slides, event);
    }

  }

  updateOrder = function (start: number) {
    Object.keys(this.articleForm.controls).forEach(key => {

      const val = this.articleForm.controls[key].controls.order.value;
      if (val > start) {
        this.articleForm.controls[key].controls.order.setValue(val + 1)
      }
    })

    console.log('======before=====', this.articleForm);
  }

  insertSlide = function (event: number) {

    this.updateOrder(event);

    //-1 because we want the index not the value spliced
    this.orderTracker++;
    const newSlide: defaultSlideObject = {order: event + 1, media: '', content: '', tags:[]};
    this.slides.splice(event, 0, newSlide);

    console.log('======after=====', this.articleForm);
  }

  submitArticle = function () {

    this.articleForm.markAllAsTouched();

    console.log('---submitted article value and form---', this.articleForm.value, this.articleForm);
  }
}
