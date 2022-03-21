import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() showNavigationArrows: string;
  @Input() showNavigationIndicators: string;
  @Input() keyboard: string;
  @Input() pauseOnHover: string;
  @Input() wrap: string;
  @Input() interval: string;
  @Input('carouselContent') slides: [];

  constructor() { }

  ngOnInit(): void {

  // This property is bound using its original name.
  // @Input() bankName: string;
  // this property value is bound to a different property name
  // when this component is instantiated in a template.
  // @Input('account-id') id: string;

  // this property is not bound, and is not automatically updated by Angular
  // normalizedBankName: string;
   
    console.log('carousel ->', this);
  }

}
