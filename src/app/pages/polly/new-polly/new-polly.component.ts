import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-polly',
  templateUrl: './new-polly.component.html',
  styleUrls: ['./new-polly.component.scss']
})
export class NewPollyComponent implements OnInit {

  articleFormGroup: FormGroup;

  payload: string;

  constructor(
    private dialog: MatDialog,
    // private articleService: ArticleService
  ) {

   }

  ngOnInit(): void {
    // this.articleService.resetArticleFormGroup();
    // this.articleFormGroup = this.articleService.getArticleFormGroup();
  }

}
