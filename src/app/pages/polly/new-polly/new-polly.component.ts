import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PollyService } from '@services/business/polly.service';

@Component({
  selector: 'app-new-polly',
  templateUrl: './new-polly.component.html',
  styleUrls: ['./new-polly.component.scss']
})
export class NewPollyComponent implements OnInit {

  pollyFormGroup: FormGroup;
  pollyProcessing = false;

  payload: string;

  constructor(
    private dialog: MatDialog,
    private pollyService: PollyService
  ) {

  }

  ngOnInit(): void {
    this.pollyService.resetPollyFormGroup();
    this.pollyFormGroup = this.pollyService.getPollyFormGroup();
  }

  submitPolly() {

    this.pollyFormGroup.markAllAsTouched();

    if (this.pollyFormGroup.valid) {
      this.pollyProcessing = true;

      this.pollyService.createPolly()
        .then(() => {
          this.pollyProcessing = false;
        });
    }

  }

}
