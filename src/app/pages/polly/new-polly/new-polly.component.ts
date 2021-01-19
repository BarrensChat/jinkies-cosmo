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

  //   console.log('====', this.releaseDate());
  //   this.articleService.setArticleFormGroup(this.articleFormGroup);
  //   const yeet = this.articleService.getArticleFormGroup();
  //   yeet.get('thumbnail').setValue('yeeeting');
  //   this.articleFormGroup.markAllAsTouched();

  //   const jaja = this.articleService.getArticleFormGroup();
  //   console.log('---submitted article value and form---', jaja.value, jaja);

    this.payload = JSON.stringify(this.pollyFormGroup.value, undefined, 2);
    console.log('---submitted polly value and form---', this.pollyFormGroup.value, this.pollyFormGroup);
  }

}
