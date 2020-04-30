import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoonQuizService {

  private dialogWidth = 300;
  private correctAnswerHigh = 390;
  private correctAnswerLow = 370;
  private userCorrectlyAnswered = false;

  constructor() { }

  checkAnswer(answer: number) {
    return this.userCorrectlyAnswered = (answer > this.correctAnswerLow && answer < this.correctAnswerHigh);
  }

  getHasUserAnsweredCorrectly() {
    return this.userCorrectlyAnswered;
  }

  getDialogWidth() {
    return this.dialogWidth;
  }
}
