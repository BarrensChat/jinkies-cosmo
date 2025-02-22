import { Component, OnInit, ChangeDetectorRef, AfterContentChecked, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@components/modals/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations: [
    trigger('constructDestruct', [
      state('construct', style({
        opacity: 1,
      })),
      state('destruct', style({
        opacity: 0,
      })),
      transition('construct => destruct', [
        animate('0.5s')
      ]),
      transition('destruct => construct', [
        animate('1s')
      ]),
    ]),
  ]
})
export class SlideComponent implements OnInit, OnDestroy, AfterContentChecked  {

  @Input() slideIndex: number;
  @Input() slide: FormGroup;
  @Input() form: FormArray;

  constructState: string;
  slideStates = {
    CONSTRUCT: 'construct',
    DESTRUCT: 'destruct'
  };

  @Output("delete") deleteSlideFunction: EventEmitter<number> = new EventEmitter<number>();
  @Output("insert") insertSlideFunction: EventEmitter<number> = new EventEmitter<number>();
  @Output("move") moveSlideFunction: EventEmitter<any> = new EventEmitter<any>();

  validLength = 5;

  constructor(private cdref: ChangeDetectorRef, private md: MatDialog) {
    this.constructState = this.slideStates.DESTRUCT;
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
    this.slideConstruct();
  }

  ngOnDestroy(): void {

  }

  deleteSlide() {
    if (this.deleteSlideFunction) {

      const dialogRef = this.md.open(ConfirmModalComponent, {
        data: {
          title: 'Deleting Slide',
          content: 'Are you sure you want to delete the slide?',
          buttonText: 'Oops, Cancel',
          buttonText2: 'Delete Slide'
        }
      });
      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.slideDestruct();
          setTimeout(() => {
            this.deleteSlideFunction.emit(this.slideIndex + 1);
          }, 500);
        }
      });

    } else {
      console.error('Delete function not available.');
    }
  }

  insertSlide() {
    if (this.insertSlideFunction) {
      this.insertSlideFunction.emit(this.slideIndex + 1);
    }
  }

  moveSlide(moveAhead: boolean) {
    const dir = (moveAhead) ? -1 : 1;

    this.moveSlideFunction.emit({
      index: this.slideIndex,
      direction: dir
    });
  }

  slideDestruct = function() {
    this.constructState = this.slideStates.DESTRUCT;
  };

  slideConstruct = function() {
    this.constructState = this.slideStates.CONSTRUCT;
  };
}
