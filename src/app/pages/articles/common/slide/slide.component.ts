import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  // @Output() slideChange = new EventEmitter<defaultSlideObject>();

  @Input() submission: boolean;

  @Input() form: FormGroup;
  @Output("delete") deleteSlideFunction: EventEmitter<number> = new EventEmitter<number>();

  media: FormControl;
  content: FormControl;
  order: FormControl;
  slideFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) { 
  }

  deleteSlide() {
    if (this.deleteSlideFunction) {
      this.deleteSlideFunction.emit(this.order.value);
    }
  }

  ngOnInit(): void {
    this.media = new FormControl('media' + this.slide.order, [
      Validators.required, 
      Validators.minLength(5),
      // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    ]);
    this.content = new FormControl('content' + this.slide.order, [
      Validators.required, 
      Validators.minLength(5),
    ]);
    this.order = new FormControl('');

    this.media.setValue(this.slide.media);
    this.content.setValue(this.slide.content);
    this.order.setValue(this.slide.order);
    
    this.slideFormGroup = this.formBuilder.group({
      order: this.order,
      media: this.media,
      content: this.content
    })

    this.form.addControl('slide' + this.order.value.toString(), this.slideFormGroup);

  }


}
