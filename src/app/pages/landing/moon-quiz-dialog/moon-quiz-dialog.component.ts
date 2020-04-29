import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-moon-quiz-dialog',
  templateUrl: './moon-quiz-dialog.component.html',
  styleUrls: ['./moon-quiz-dialog.component.scss']
})
export class MoonQuizDialogComponent implements OnInit {

  distance: number

  constructor(
    public dialogRef: MatDialogRef<MoonQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {distance: number}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  distanceLabel(value: number) {
    if (value >= 0) {
      return Math.round(value) + 'k';
    }

    return value;
  }
}
