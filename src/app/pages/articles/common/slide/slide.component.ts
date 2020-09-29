import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


  export interface defaultSlideObject {
    order: number,
    media: string,
    content: string,
    tags: Array<number>
  }

  export interface Tags {
    name: string;
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
  @Output("insert") insertSlideFunction: EventEmitter<number> = new EventEmitter<number>();

  media: FormControl;
  content: FormControl;
  order: FormControl;
  tagsControl: FormControl;
  slideFormGroup: FormGroup;
  validLength = 5;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [
    {name: 'meme'},
    {name: 'anime'},
    {name: 'polita'},
  ];

  constructor(private formBuilder: FormBuilder) { 
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tags: Tags): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  deleteSlide() {
    if (this.deleteSlideFunction) {
      this.deleteSlideFunction.emit(this.order.value);
    }
  }

  insertSlide() {
    if (this.insertSlideFunction) {
      this.insertSlideFunction.emit(this.order.value);
    }
  }

  ngOnInit(): void {
    this.media = new FormControl('media' + this.slide.order, [
      Validators.required, 
      Validators.minLength(this.validLength),
      // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    ]);
    this.content = new FormControl('content' + this.slide.order, [
      Validators.required, 
      Validators.minLength(this.validLength),
    ]);
    this.tagsControl = new FormControl('tagsControl' + this.slide.order, [
      Validators.required, 
      Validators.minLength(this.validLength),
    ]);
    this.order = new FormControl('');

    this.media.setValue(this.slide.media);
    this.content.setValue(this.slide.content);
    this.order.setValue(this.slide.order);
    this.tagsControl.setValue(this.slide.tags);
    
    this.slideFormGroup = this.formBuilder.group({
      order: this.order,
      media: this.media,
      content: this.content,
      tags: this.tags
    })

    this.form.addControl('slide' + this.order.value.toString(), this.slideFormGroup);

  }


}
