import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

  export interface defaultSlideObject {
    order: number,
    media: string,
    content: string
  }

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input() slideIndex: number;
  
  @Input() slide: defaultSlideObject;
  @Output() slideChange = new EventEmitter<defaultSlideObject>();

  @Input() form: FormGroup;
  @Output("delete") deleteSlideFunction: EventEmitter<number> = new EventEmitter<number>();

  media = new FormControl('');
  content = new FormControl('');
  order = new FormControl('');

  slideFormGroup = new FormGroup({
    order: this.order,
    media: this.media,
    content: this.content
  })

  deleteSlide() {
    if (this.deleteSlideFunction) {
      this.deleteSlideFunction.emit(this.order.value);
    }
  }

  constructor() { }

  ngOnInit(): void {

    this.media.setValue(this.slide.media);
    this.content.setValue(this.slide.content);
    this.order.setValue(this.slide.order);

    this.form.addControl('slide' + this.order.value.toString(), this.slideFormGroup);

  }


}
