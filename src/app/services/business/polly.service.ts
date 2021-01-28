import { Injectable } from '@angular/core';

import { FormGroup, FormControl, FormArray,  FormBuilder, Validators, Validator } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { VideoFileValidator, AudioFileValidator, ImageFileValidator } from '@classes/validators';
import { HttpRequestService } from '@services/http-request.service';
import { Observable } from 'rxjs';
import { AppConstants } from '@constants/app-constants';
import { Router } from '@angular/router';

export interface TableElementColumns {
  id: number;
  language_code: string;
  voice_code: string;
  created_at: string;
}

export interface DefaultPollyObject {
  label: string;
  created_at: string;
  language_code: string;
  voice_code: string;
  url: string;
  speech: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class PollyService {

  private languages;
  private voices;
  private pollyFormGroup: FormGroup;
  private newPolly: DefaultPollyObject;
  private validPollyTitleLength: 5;
  private pollyTableHeaders = ['id', 'language_code', 'voice_code', 'created_at'];
  private ENGLISH_US_LANGUAGE_CODE = 'en-US';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private hs: HttpRequestService,
    private router: Router) {
  }

  getTableHeaders(): Array<any> {
    return this.pollyTableHeaders;
  }

  getPollyFormGroup() {
    return this.pollyFormGroup;
  }

  setPollyFormGroup(pfg: FormGroup) {
    this.pollyFormGroup = pfg;
  }

  resetPollyFormGroup() {
    if (this.pollyFormGroup) {
      this.pollyFormGroup.reset();
    }

    this.pollyFormGroup = this.getFreshPollyFormGroup();
  }

  getValidLength() {
    return this.validPollyTitleLength;
  }

  getLanguages = function() {
    return this.languages;
  }

  setLanguages = function() {

    this.hs.getRequest(AppConstants.API_ENDPOINTS.polly.get_languages)
    .subscribe(data => {
      if (data && !data['error']) {
        this.languages = data;
      } else {
        this.languages = [];
      }

      //TODO: throw errors if bad request

    });
  }

  setVoices = function(languageCode: string): Observable<any[]> {

    return this.hs.getRequest(AppConstants.API_ENDPOINTS.polly.get_voices + '?language_code=' + languageCode)
    .subscribe(data => {
      if (data && !data['error']) {
        this.voices = data;

        if (this.voices.length > 0 && typeof this.voices[0].Id !== undefined) {
          this.pollyFormGroup.controls['voice_code'].setValue(this.voices[0].Id);
        }

        return this.voices;
      } else {
        this.voices = [];
        this.pollyFormGroup.controls['voice_code'].reset();
        return this.voices;
      }

      //TODO: throw errors if bad request

    });
  }

  createPolly = function(): Observable<any> {

    const payload = JSON.stringify(this.pollyFormGroup.value, undefined, 2);

    return this.hs.postRequest(AppConstants.API_ENDPOINTS.polly.create, payload)
    .subscribe(data => {
      if (data && !data['error']) {

        if(typeof data.taskID !== undefined && typeof data.uri !== undefined) {
          this.snackBar.open('Polly has been created', 'Success', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

          this.router.navigate(['jinkies/polly/all']);
        }

        return data;
      } else {

        if (data['error']) {
          console.error(data['error']);
        }
        return data;
      }

    });
  }

  getVoices = function() {
    return this.voices;
  }

  getPollysRequest = function(){
    return this.hs.getRequest(AppConstants.API_ENDPOINTS.polly.get_all);
  }

  // SNACKBARS / TOASTS
  // this.snackBar.open('Slide ' + (index + 1) + ' moved', textDirection, {
  //   duration: 2500,
  //   horizontalPosition: 'center',
  //   verticalPosition: 'top',
  // });

  getDefaultEnglishLanguageCode() {
    return this.ENGLISH_US_LANGUAGE_CODE;
  }

  getFreshPollyFormGroup() {

    //The backend will set some of the data upon creation (user, created_at, url..)
    const pollyFormGroup = this.fb.group({
      title: this.fb.control(null, [Validators.minLength(this.validPollyTitleLength), Validators.required]),
      language_code: this.fb.control(null, [Validators.required]),
      voice_code: this.fb.control(null, [Validators.required]),
      speech: this.fb.control(null, [Validators.required, Validators.minLength(1)]),
    });

    pollyFormGroup.controls['language_code'].setValue(this.ENGLISH_US_LANGUAGE_CODE);

    return pollyFormGroup;
  }
}
