import { Component, OnInit } from '@angular/core';
import { PollyService, TableElementColumns } from '@services/business/polly.service';
import { FileService } from '@services/file.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@components/modals/confirm-modal/confirm-modal.component';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import * as fileSaver from 'file-saver';
import { Pagination } from '@classes/pagination';

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

  pollys: Array<any>;
  tableHeaders: Array<any>;
  expandedElement: TableElementColumns | null;
  faPlay = faPlay;
  showTable = false;
  pagination: Pagination;


  constructor(private ps: PollyService, private md: MatDialog, private fileService: FileService) { }

  ngOnInit(): void {
    this.tableHeaders = this.ps.getTableHeaders();
    this.pagination = new Pagination({});

    this._fetchPollies(this.pagination);
  }

  fetchPolliesPaginated = function(e: any) {
    const tmpPageObj = new Pagination({});
    tmpPageObj.per_page = e.pageSize;
    tmpPageObj.current_page = e.pageIndex + 1;
    this._fetchPollies(tmpPageObj);
  }

  _fetchPollies = function(pageData: Pagination) {

    this.ps.getPollysRequest(pageData)
      .subscribe(data => {

        if (data && !data['error']) {

          //TODO: to handle paging this data structure will be different and will need to be changed
          this.pollys = data.data;

          this.pagination = new Pagination(data);
          this.showTable = true;

        } else {
          this.pollys = [];

          this.pagination = new Pagination({});
        }

      });
  }


  delete(fileID: number, fileName: string) {

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

        //TODO: this isnt being treated as an observable
        this.ps.deletePolly(fileID, fileName);

        this.pollys = this.pollys.filter(polly =>{
          if (polly.id !== fileID) {
            return polly;
          }
        });
      }
    });
  }

  play(url: string): void {
    this.ps.playPolly(url);
  }

  download(url: string): void {

    this.fileService.downloadFile(url).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			// const url = window.URL.createObjectURL(blob);
			//window.open(url);
      //window.location.href = response.url;
      console.log('response from file ->', response);
			// fileSaver.saveAs(blob, 'employees.json');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
}
