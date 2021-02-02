
import { Directive} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl} from '@angular/forms';

const videoFileFormats = ['mov', 'mp4'];
const imageFileFormats = ['png', 'jpg', 'jpeg'];
const audioFileFormats = ['mp3', 'mp4', 'wav'];

@Directive({
  selector: '[appVideoFormat]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: VideoFileValidator, multi: true },
  ]
})

export class VideoFileValidator implements Validator {
  static validate(c: FormControl): {[key: string]: any} {

    const file = c.value;

    if ( file ) {

      // Opting for a video
      // const extension = file.name.split('.')[1].toLowerCase();
      const fileType = file.type.split('video/').pop();

      if (fileType && !videoFileFormats.includes(fileType.toLowerCase()) ) {
        return {
          invalidVideoFormat: true
        };
      }
      return null;
    }

    return null;
  }

  validate(c: FormControl): {[key: string]: any} {
    return VideoFileValidator.validate(c);
  }
}


// ****


@Directive({
  selector: '[appImageFormat]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: ImageFileValidator, multi: true },
  ]
})

export class ImageFileValidator implements Validator {
  static validate(c: FormControl): {[key: string]: any} {

    const file = c.value;

    if ( file ) {
      console.log('file ->', file);
      const fileType = file.type.split('image/').pop();

      if (fileType && !imageFileFormats.includes(fileType.toLowerCase()) ) {
        return {
          invalidImageFormat: true
        };
      }
      return null;
    }

    return null;
  }

  validate(c: FormControl): {[key: string]: any} {
    return ImageFileValidator.validate(c);
  }
}


// ****


@Directive({
  selector: '[appAudioFormat]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: AudioFileValidator, multi: true },
  ]
})

export class AudioFileValidator implements Validator {
  static validate(c: FormControl): {[key: string]: any} {

    const file = c.value;

    if ( file ) {
      // TODO: check for potential audio AND video types for audio
      const fileType = file.type.split('audio/').pop();

      if (fileType && !audioFileFormats.includes(fileType.toLowerCase()) ) {
        return {
          invalidAudioFormat: true
        };
      }
      return null;
    }

    return null;
  }

  validate(c: FormControl): {[key: string]: any} {
    return AudioFileValidator.validate(c);
  }
}
