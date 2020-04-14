import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {
  faCoffee = faCoffee;
  faPiggyBank = faPiggyBank;
  faDollarSign = faDollarSign;

  constructor() {
    
  }

  ngOnInit(): void {
  }

}
