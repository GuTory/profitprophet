import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CandleSeriesService,
  DataLabelService,
  DateTimeService,
  LegendService,
  StockChartModule,
  TooltipService
} from "@syncfusion/ej2-angular-charts";
import {StockHistoryService} from "../../service/history/stock-history.service";
import { ActivatedRoute } from '@angular/router';
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule, StockChartModule],
  providers: [
    DateTimeService,
    LegendService,
    TooltipService,
    DataLabelService,
    CandleSeriesService,
    StockHistoryService
  ],
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StockHistoryComponent {

  public stockchartData$: Observable<object[]>;
  public ticker: string = '';
  public title: string = 'Historic Data';

  constructor(
    private stockHistoryService: StockHistoryService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.stockchartData$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        this.ticker = params.get('ticker') || '';
        return this.stockHistoryService.getStockHistory(this.ticker);
      })
    );
  }
}
