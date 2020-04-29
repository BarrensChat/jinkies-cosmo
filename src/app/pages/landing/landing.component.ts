import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MoonQuizDialogComponent} from './moon-quiz-dialog/moon-quiz-dialog.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MoonQuizDialogComponent, {
      width: '300px',
      data: {distance: 73}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}