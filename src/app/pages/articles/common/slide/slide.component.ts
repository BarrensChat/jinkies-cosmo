import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

  export const defaultSlideObject = {
    media: '',
    content: '***Add Content***'
  }

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input() slideIndex: number;
  media = new FormControl(defaultSlideObject.media);
  content = new FormControl(defaultSlideObject.content);

  constructor() { }

  ngOnInit(): void {

    
  }

}
