import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoonQuizService } from '../../../services/moon-quiz.service';
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
  spaceImgSize = 40; //this is the px width and height of the earth and moon

  constructor(
    public dialogRef: MatDialogRef<MoonQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {distance: number},
    private router: Router,
    private moonQuizService: MoonQuizService) { }

  ngOnInit(): void {
    this.moonMargin = 0;

    this.router.events.subscribe((val) => {
      // TODO: need to check this router event and allow the transition
      // console.log(val instanceof NavigationEnd) 
  });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateMoonMargin() {
    const quizDialogWidth = this.moonQuizService.getDialogWidth();
    const workableWidth = quizDialogWidth - (this.dialogPadding + (this.spaceImgSize * 2));
    const valuePercentage = this.value / this.maxDistance;
    this.moonMargin = Math.floor(valuePercentage * workableWidth);
  }

  checkAnswer() {
    if(this.moonQuizService.checkAnswer(this.value)) {

      console.log('You are correct summoner');
      this.router.navigate(['menu']);
    } else {
      console.log('Thank you for your contribution...')
    }
  }

  distanceLabel(value: number) {
    if (value >= 0) {
      return Math.round(value) + 'k';
    }

    return value;
  }
}
