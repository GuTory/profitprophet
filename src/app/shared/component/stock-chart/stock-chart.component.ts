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
import * as assert from "assert";
import { LoadingService } from 'app/shared/service/loading/loading.service';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule, StockChartModule],
  providers: [
    DateTimeService,
    LegendService,
    TooltipService,
    DataLabelService,
    CandleSeriesService
  ],
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StockChartComponent implements OnInit{

  public stockchartData: object[] |undefined;
  public fileContent: string | undefined;
  @Input() public title: string = 'Stock Data';

constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.setIsLoading(true);
    this.loadStockData("AAPL").then((data) => {
      this.stockchartData = data.default;
      //console.log(this.stockchartData);
      this.loadingService.setIsLoading(false);
    });
  }

  async loadStockData(ticker: string) {
    return await import("assets/stocks/" + ticker + ".json");
  }
}
