import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit {

  @Input() fc: FormGroup;
  @Input() fileName: string;
  onChange: () => void;

  public file: File | null = null;
  public fn = 'or drag and drop file here';
  public updated = false;
  public imageURL: string;

  constructor( private host: ElementRef<HTMLInputElement>) {

  }

  ngOnInit(): void {

  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.fc.setValue({
      media: file
    });

    // this.fc.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.fn = file.name;
      this.updated = true;
    };
    reader.readAsDataURL(file);

  }

  registerOnChange( fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched( fn: () => void) {
  }
}
