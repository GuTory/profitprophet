import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {PolygonRestService} from "../stock-service/polygon-rest/polygon-rest.service";
import {DateTimeService, StockChartModule, TooltipService} from "@syncfusion/ej2-angular-charts";
import {AuthComponent} from "../auth/auth.component";
import {StockChartComponent} from "../shared/stock-chart/stock-chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    StockChartModule,
    AuthComponent,
    StockChartComponent],
  providers: [PolygonRestService, DateTimeService, TooltipService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'profitProphetFrontend';
}
