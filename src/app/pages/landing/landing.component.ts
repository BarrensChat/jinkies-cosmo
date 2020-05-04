import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MoonQuizDialogComponent} from './moon-quiz-dialog/moon-quiz-dialog.component';
import { MoonQuizService } from '@services/moon-quiz.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public dialog: MatDialog, private MoonQuizService: MoonQuizService) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    const quizDialogWidth = this.MoonQuizService.getDialogWidth();
    const dialogRef = this.dialog.open(MoonQuizDialogComponent, {
      width: String(quizDialogWidth) + 'px',
      data: {distance: 0}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('quiz dialog closed');
      // this.animal = result;
    });
  }

}