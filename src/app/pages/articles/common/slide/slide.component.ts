import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

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
  @Input() slide: FormGroup;
  @Input() form: FormArray;

  @Output("delete") deleteSlideFunction: EventEmitter<number> = new EventEmitter<number>();
  @Output("insert") insertSlideFunction: EventEmitter<number> = new EventEmitter<number>();
  @Output("move") moveSlideFunction: EventEmitter<any> = new EventEmitter<any>();

  validLength = 5;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [
    {name: 'meme'},
    {name: 'anime'},
    {name: 'polital'},
  ];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

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
      this.deleteSlideFunction.emit(this.slideIndex + 1);
    }
  }

  insertSlide() {
    if (this.insertSlideFunction) {
      this.insertSlideFunction.emit(this.slideIndex + 1);
    }
  }

  moveSlide(moveAhead: boolean) {
    const dir = (moveAhead) ? -1 : 1;

    this.moveSlideFunction.emit({index: this.slideIndex, direction: dir});
  }
}
