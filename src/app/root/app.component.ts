import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {PolygonRestService} from "../shared/service/polygon-rest/polygon-rest.service";
import {DateTimeService, StockChartModule, TooltipService} from "@syncfusion/ej2-angular-charts";
import {AuthComponent} from "../auth/auth.component";
import {StockChartComponent} from "../shared/component/stock-chart/stock-chart.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {LoadingService} from "../shared/service/loading/loading.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {StockHistoryService} from "../shared/service/stock-history/stock-history.service";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SidenavDirective} from "../shared/directive/sidenav/sidenav.directive";

const openCloseAnimation = trigger('openClose', [
  state('open', style({transform: 'rotate(0)'})),
  state('close', style({transform: 'rotate(-180deg)'})),
  transition('open => close', animate('0.2s ease-in')),
  transition('close => open', animate('0.2s ease-out')),
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    StockChartModule,
    AuthComponent,
    StockChartComponent,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    SidenavDirective
  ],
  providers: [PolygonRestService, DateTimeService, TooltipService, LoadingService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class AppComponent implements AfterViewInit{
  title = 'Profit Prophet';
  isLoading = true;
  sideNavState = 'close';
  ticker = new FormControl('');

  constructor(public loadingService: LoadingService, private cdr: ChangeDetectorRef) {
    this.loadingService.isLoading$.pipe(takeUntilDestroyed()).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  toggleSideNav() {
    this.sideNavState = this.sideNavState === 'close' ? 'open' : 'close';
  }

  searchTicker(){
  }
}
