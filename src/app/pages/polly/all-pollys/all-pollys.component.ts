import { Component, OnInit } from '@angular/core';
import { PollyService, TableElementColumns } from '@services/business/polly.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-all-pollys',
  templateUrl: './all-pollys.component.html',
  styleUrls: ['./all-pollys.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class AllPollysComponent implements OnInit {

  pollys: any;
  tableHeaders: Array<any>;
  expandedElement: TableElementColumns | null;

  constructor(private ps: PollyService, private md: MatDialog) { }

  ngOnInit(): void {
    this.tableHeaders = this.ps.getTableHeaders();

    this.pollys = this.ps.getPollysRequest()
      .subscribe(data => {

        if (data && !data['error']) {
          this.pollys = data.data;
        } else {
          this.pollys = [];
        }

        console.log('Pollys ->', data);
      });
  }

  delete(): void {

    const dialogRef = this.md.open(ConfirmModalComponent, {
      data: {
        title: 'Deleting Polly',
        content: 'Are you sure you want to delete the clip?',
        buttonText: 'Oops, Cancel',
        buttonText2: 'Delete Polly'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.ps.deletePolly().then(data => {

        });
      }
    });


  }
}
