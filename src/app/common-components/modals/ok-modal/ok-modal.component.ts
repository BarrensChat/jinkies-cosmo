import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ok-modal',
  templateUrl: './ok-modal.component.html',
  styleUrls: ['./ok-modal.component.scss']
})
export class OkModalComponent implements OnInit {

  public title: string;
  public content: string;
  public buttonText: string;

  constructor(
    public dialogRef: MatDialogRef<OkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, content: string, buttonText: string}
  ) { }

  ngOnInit(): void {
  }

  // customButton(): void {
  //   this.dialogRef.close();
  // }

}
