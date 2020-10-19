import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoonQuizService } from '@services/moon-quiz.service';
import { OkModalComponent } from '@components/modals/ok-modal/ok-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moon-quiz-dialog',
  templateUrl: './moon-quiz-dialog.component.html',
  styleUrls: ['./moon-quiz-dialog.component.scss']
})
export class MoonQuizDialogComponent implements OnInit {

  distance: number;
  value = 0;
  maxDistance = 500;
  moonMargin: number;
  dialogPadding = 48; //both left and right padding are 24px
  private spaceImgSize = 40; //this is the px width and height of the earth and moon
  private dialogWidth = 0;

  constructor(
    public dialogRef: MatDialogRef<MoonQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {distance: number},
    private router: Router,
    private moonQuizService: MoonQuizService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.moonMargin = 0;
    this.dialogWidth = this.moonQuizService.getDialogWidth();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateMoonMargin() {
    const workableWidth = this.dialogWidth - (this.dialogPadding + (this.spaceImgSize * 2));
    const valuePercentage = this.value / this.maxDistance;
    this.moonMargin = Math.floor(valuePercentage * workableWidth);
  }

  checkAnswer() {
    if(this.moonQuizService.checkAnswer(this.value)) {
      this.router.navigate(['menu']);
    } else {
      console.log('Thank you for your contribution...')

      const modalRef = this.dialog.open(OkModalComponent, {
        width: String(this.dialogWidth) + 'px',
        data: {title: 'Whoops', content: 'Looks like you failed and cannot enter the site. Better start googling!', buttonText: 'Guess I\'ll try again...'}
      });
    }
  }

  distanceLabel(value: number) {
    if (value >= 0) {
      return Math.round(value) + 'k';
    }

    return value;
  }
}
