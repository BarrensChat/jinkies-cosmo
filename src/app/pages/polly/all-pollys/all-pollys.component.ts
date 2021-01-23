import { Component, OnInit } from '@angular/core';
import { PollyService, TableElementColumns } from '@services/business/polly.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-all-pollys',
  templateUrl: './all-pollys.component.html',
  styleUrls: ['./all-pollys.component.scss']
})
export class AllPollysComponent implements OnInit {

  pollys: any;
  tableHeaders: Array<any>;
  expandedElement: TableElementColumns | null;

  constructor(private ps: PollyService) { }

  ngOnInit(): void {
    this.tableHeaders = this.ps.getTableHeaders();

    this.pollys = this.ps.getPollysRequest()
      .subscribe(data => {

        if (data && !data['error']) {
          this.pollys = data;
        } else {
          this.pollys = [];
        }

        console.log('Pollys ->', data);
      });
  }
}
