import { Component, OnInit } from '@angular/core';
import { ArticleService, TableElementColumns } from '@services/business/article.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllArticlesComponent implements OnInit {

  articles: any;
  rqError = false;
  tableHeaders: Array<any>;
  expandedElement: TableElementColumns | null;

  constructor(private as: ArticleService) { }

  ngOnInit(): void {
    this.tableHeaders = this.as.getTableHeaders();

    this.articles = this.as.getArticlesRequest()
      .subscribe(data => {
        console.log('Articles ->', data);
        if (data && !data['error']) {
          this.articles = data;
        }

        //TODO: throw errors if bad request

      });
  }

}
