import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PollyService } from '@services/business/polly.service';
import { OkModalComponent } from '@components/modals/ok-modal/ok-modal.component';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-polly',
  templateUrl: './polly.component.html',
  styleUrls: ['./polly.component.scss']
})
export class PollyComponent implements OnInit {

  @Input() pollyFormGroup: FormGroup;
  @Input() mode: string;

  constructor(private pollyService: PollyService) { }

  ngOnInit(): void {
    this.pollyService.setPollyFormGroup(this.pollyFormGroup);

    this.pollyService.setLanguages();
    this.watchVoices();
    this.pollyService.setVoices(this.pollyService.getDefaultEnglishLanguageCode());
  }

  watchVoices = function() {

    this.pollyFormGroup.get('language_code').valueChanges.subscribe(val => {
      this.pollyService.setVoices(val);


    });

  }

  createdAt(): FormControl {
    return this.pollyFormGroup.get('created_at') as FormControl;
  }

  validLength(): number {
    return this.pollyService.getValidLength();
  }

  title(): FormControl {
    return this.pollyFormGroup.get('title') as FormControl;
  }

  speech(): FormControl {
    return this.pollyFormGroup.get('speech') as FormControl;
  }

  languageCode(): FormControl {
    return this.pollyFormGroup.get('language_code') as FormControl;
  }

  voiceCode(): FormControl {
    return this.pollyFormGroup.get('voice_code') as FormControl;
  }


  // category(): FormControl {
  //   return this.articleFormGroup.get('category') as FormControl;
  // }

  languages = function() {
    return this.pollyService.getLanguages();
  }

  voices = function() {
    return this.pollyService.getVoices();
  }

  // insertSlide(index: number) {
  //   this.articleService.insertSlide(index, null);
  // }

}
