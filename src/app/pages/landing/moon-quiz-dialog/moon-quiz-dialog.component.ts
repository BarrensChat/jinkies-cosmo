import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  dialogWidth = 300; //total width of the dialog

  constructor(
    public dialogRef: MatDialogRef<MoonQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {distance: number, dialogWidth: number},
    private router: Router) {}

  ngOnInit(): void {
    this.moonMargin = 0;
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
    if (this.value > 370 && this.value < 390) {
      this.router.navigate(['menu;jaja=yeet']);
    }
  }

  distanceLabel(value: number) {
    if (value >= 0) {
      return Math.round(value) + 'k';
    }

    return value;
  }
}
