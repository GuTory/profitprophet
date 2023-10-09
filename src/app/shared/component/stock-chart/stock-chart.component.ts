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
import {LoadingService} from 'app/shared/service/loading/loading.service';
import {StockHistoryService} from "../../service/stock-history/stock-history.service";
import {HttpClientModule} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { ActivatedRoute } from '@angular/router';
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule, StockChartModule, HttpClientModule],
  providers: [
    DateTimeService,
    LegendService,
    TooltipService,
    DataLabelService,
    CandleSeriesService,
    StockHistoryService
  ],
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StockChartComponent {

  public stockchartData$: Observable<object[]>;
  public ticker: string = '';
  @Input() public title: string = 'Stock Data';

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
