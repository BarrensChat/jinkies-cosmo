import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';

  export interface defaultSlideObject {
    media: '',
    content: ''
  }

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  // media = new FormControl(defaultSlideObject.media);
  // content = new FormControl(defaultSlideObject.content);

  @Input() slideIndex: number;
  @Input() slide: defaultSlideObject;
  @Output("delete") deleteSlideFunction: EventEmitter<number> = new EventEmitter<number>();

  deleteSlide() {
    if (this.deleteSlideFunction) {
      this.deleteSlideFunction.emit(this.slideIndex);
    }
  }

  constructor() { }

  ngOnInit(): void {

    // this.media = new FormControl(this.slide.media);
    // this.content = new FormControl(this.slide.content);

  }


}
