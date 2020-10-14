import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

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

  @Input() fc: FormControl;
  @Input() fileName: string;
  onChange: () => void;

  public file: File | null = null;
  public fn = 'or drag and drop file here';
  public updated = false;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {

    // Using item(0) here because we only want one file.
    const file = event && event.item(0);
    this.file = file;
    this.fc.setValue(file);
    this.fn = file.name;
    this.updated = true;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  ngOnInit(): void {

  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched( fn: () => void) {
  }
}
