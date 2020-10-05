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

  media;

  @Output("delete") deleteSlideFunction: EventEmitter<number> = new EventEmitter<number>();
  @Output("insert") insertSlideFunction: EventEmitter<number> = new EventEmitter<number>();
  @Output("move") moveSlideFunction: EventEmitter<any> = new EventEmitter<any>();

  validLength = 5;

  constructor() {
  }

  ngOnInit(): void {

  }

  onFileSelected(selector: string) {
    const inputNode: any = document.querySelector('#' + selector);

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log('setting----->', e.target.result);
        // this.[selector] = e.target.result;
        this.media = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
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
