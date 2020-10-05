import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


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

  constructor() {
  }

  ngOnInit(): void {

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
