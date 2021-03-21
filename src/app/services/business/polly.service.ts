import { Injectable } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { HttpRequestService } from '@services/http-request.service';
import { FileService } from '@services/file.service';
import { Observable, of } from 'rxjs';
import { AppConstants } from '@constants/app-constants';
import { Router } from '@angular/router';
import { Pagination } from '@classes/pagination';

export interface TableElementColumns {
  id: number;
  language_code: string;
  voice_code: string;
  title: string;
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
  private pollyTableHeaders = ['id', 'language_code', 'voice_code', 'title', 'created_at'];
  private ENGLISH_US_LANGUAGE_CODE = 'en-US';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private hs: HttpRequestService,
    private router: Router,
    private fs: FileService) {
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

  createPolly = function() {

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

  deletePolly = function(fileID: number, fileName: string) {
    const tmpObj = {
      file_id: fileID,
      file_name: fileName
    }
    const payload = JSON.stringify(tmpObj, undefined, 2);

    return this.hs.postRequest(AppConstants.API_ENDPOINTS.polly.delete, payload)
    .subscribe(data => {

      if (data && !data['errors']) {

          this.snackBar.open('Polly has been deleted', 'Success', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

        return data;
      } else {

        if (data['errors']) {

          this.snackBar.open('Polly was NOT deleted', 'Error', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['danger-snackbar']
          });

          this.router.navigate(['jinkies/polly/all']);
          console.error(data['errors']);
        }

        return data;
      }

    });
  }

  getVoices = function() {
    return this.voices;
  }

  getPollysRequest = function(pagination: Pagination){
    return this.hs.getRequest(AppConstants.API_ENDPOINTS.polly.get_all + pagination.getQueryParams());
  }

  playPolly = function(url: string): void {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }

  downloadPolly = function(url: string): any {
    return this.fs.downloadFile(url);
  }

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
