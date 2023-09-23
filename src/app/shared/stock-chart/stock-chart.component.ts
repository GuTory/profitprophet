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
import {stockData} from "./stock.data";

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
export class StockChartComponent {

  public stockchartData: object[] = stockData
  @Input() public title: string = 'Stock Data';
}
