import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {PolygonRestService} from "../stock-service/polygon-rest/polygon-rest.service";
import {
  ChartTheme,
  CrosshairSettingsModel, DateTimeService,
  IStockChartEventArgs,
  ITooltipRenderEventArgs,
  StockChartAreaModel,
  StockChartAxisModel,
  StockChartModule, TooltipService
} from "@syncfusion/ej2-angular-charts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, StockChartModule],
  providers: [PolygonRestService, DateTimeService, TooltipService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'profitProphetFrontend';

  chartData = [{
    "date": new Date('2012-04-02'),
    "open": 320.705719,
    "high": 324.074066,
    "low": 317.737732,
    "close": 323.783783,
    "volume": 45638000
  }, {
    "date": new Date('2012-04-03'),
    "open": 323.028015,
    "high": 324.299286,
    "low": 319.639648,
    "close": 321.631622,
    "volume": 40857000
  }, {
    "date": new Date('2012-04-04'),
    "open": 319.544556,
    "high": 319.819824,
    "low": 315.865875,
    "close": 317.892883,
    "volume": 32519000
  }, {
    "date": new Date('2012-04-05'),
    "open": 316.436432,
    "high": 318.533539,
    "low": 314.599609,
    "close": 316.476471,
    "volume": 46327000
  }]

  public data1: Object[] = this.chartData;

  public primaryXAxis: StockChartAxisModel = {
    majorGridLines: {
      color: 'transparent'
    },
    crosshairTooltip: {
      enable: true
    }
  };

  public primaryYAxis: StockChartAxisModel = {
    lineStyle: {color: 'transparent'},
    majorTickLines: {color: 'transparent', height: 0},
  };
  public crosshair: CrosshairSettingsModel = {
    enable: true
  };

  public tooltipRender(args: ITooltipRenderEventArgs): void {
    if (args.text && args.text.split('<br/>')[4]) {
      let target: number = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], 10);
      let value: string = (target / 100000000).toFixed(1) + 'B';
      args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    } else {
    }
  };

  // custom code start
  public load(args: IStockChartEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme || 'Material';
    args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
  };

  // custom code end
  public chartTitle: string = 'AAPL Stock Price';

  public tooltip: object = {enable: true};
  public chartArea: StockChartAreaModel = {
    border: {
      width: 0
    }
  };
  public enable: boolean = true;

}
