import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-angular-helper-links',
  templateUrl: './angular-helper-links.component.html',
  styleUrls: ['./angular-helper-links.component.scss']
})
export class AngularHelperLinksComponent implements OnInit {
  faCoffee = faCoffee;
  faPiggyBank = faPiggyBank;
  faDollarSign = faDollarSign;

  constructor() { }

  ngOnInit(): void {
  }

}
