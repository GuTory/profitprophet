import {Component, inject, OnDestroy, ViewEncapsulation} from '@angular/core';
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
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription, switchMap} from "rxjs";
import {PolygonRestService} from "../../service/polygon-rest/polygon-rest.service";
import {IAggsPreviousClose} from '@polygon.io/client-js';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {PredictionService} from 'app/stock/service/prediction/prediction.service';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule, StockChartModule, MatTableModule, MatCardModule],
  providers: [
    DateTimeService,
    LegendService,
    TooltipService,
    DataLabelService,
    CandleSeriesService,
    StockHistoryService,
    PolygonRestService,
    PredictionService
  ],
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StockHistoryComponent implements OnDestroy {
  private stockHistoryService = inject(StockHistoryService);
  private activatedRoute = inject(ActivatedRoute);
  private polygonRestService = inject(PolygonRestService);
  private predictionService = inject(PredictionService);

  public stockchartData$: Observable<object[]>;
  private polygonSubscription: Subscription | undefined;
  public ticker: string = '';
  public title: string = 'Historic Data';
  public previousClose: IAggsPreviousClose | undefined;
  public prediction$: Observable<number> | undefined;


  constructor() {
    this.stockchartData$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        this.ticker = params.get('ticker') || '';
        this.prediction$ = this.predictionService.getPrediction(this.ticker);
        this.polygonSubscription = this.polygonRestService
          .getPreviousClose(this.ticker)
          .pipe()
          .subscribe({
            next: (data) => {
              this.previousClose = data;
            },
            error: (err) => {
              console.log('Polygon api call failed ' + err);
            }
          });
        return this.stockHistoryService.getStockHistory(this.ticker);
      })
    );
  }

  ngOnDestroy() {
    this.polygonSubscription?.unsubscribe();
  }
}
