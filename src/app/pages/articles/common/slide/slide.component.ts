import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

  export interface defaultSlideObject {
    media: string,
    content: string
  }

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  media = new FormControl('');
  content = new FormControl('');
  slideFormGroup = new FormGroup({
    media: this.media,
    content: this.content
  })

  @Input() slideIndex: number;
  @Input() slide: defaultSlideObject;
  @Input() form: FormGroup;
  @Output("delete") deleteSlideFunction: EventEmitter<number> = new EventEmitter<number>();

  deleteSlide() {
    if (this.deleteSlideFunction) {
      this.deleteSlideFunction.emit(this.slideIndex);
    }
  }

  constructor() { }

  ngOnInit(): void {

    this.media.setValue(this.slide.media);
    this.content.setValue(this.slide.content);


    this.form.addControl('slide' + this.slideIndex.toString(), this.slideFormGroup);

  }


}
