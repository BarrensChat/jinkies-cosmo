import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  caDomains = environment.domains_for_sale.CA;
  comDomains = environment.domains_for_sale.COM;
  carouselContent = [
    {
      title: 'Available Domains',
      info: '.CA and .COM listed below',
      imgUrl: 'assets/images/bank.jpg',
      imgAlt: 'bank jpg'
    },
    {
      title: 'Available Domains',
      info: '.CA and .COM listed below',
      imgUrl: 'assets/images/bitcoin.jpg',
      imgAlt: 'bitcoin jpg'
    }
  ]

  constructor(private actRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {

    console.log('params ->', this.actRoute.snapshot.params);
  }

}
