import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {PolygonRestService} from "./stock/service/polygon-rest/polygon-rest.service";
import {DateTimeService, StockChartModule, TooltipService} from "@syncfusion/ej2-angular-charts";
import {AuthComponent} from "./auth/component/auth.component";
import {StockHistoryComponent} from "./stock/component/history/stock-history.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {StockHistoryService} from "./stock/service/history/stock-history.service";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SidenavDirective} from "./shared/directive/sidenav/sidenav.directive";
import {StockMetaService} from "./stock/service/meta/stock-meta.service";
import {DrawerComponent} from "./shared/component/drawer/drawer.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";

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
    StockChartModule,
    AuthComponent,
    StockHistoryComponent,
    MatButtonModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    SidenavDirective,
    DrawerComponent,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  providers: [PolygonRestService, DateTimeService, TooltipService, StockMetaService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class AppComponent {
  title = 'Profit Prophet';
  sideNavState = 'close';
  toolbarState = 'close';
  isWindowBigEnough = false;

  constructor() {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    this.isWindowBigEnough = window.innerWidth > 800;
  }

  toggleSideNav() {
    this.sideNavState = this.sideNavState === 'close' ? 'open' : 'close';
  }
}
