import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidenavDirective} from "../../directive/sidenav/sidenav.directive";
import {MatInputModule} from "@angular/material/input";
import {StockHistoryService} from "../../../stock/service/history/stock-history.service";
import {HttpClientModule} from "@angular/common/http";
import {StockMetaService} from "../../../stock/service/meta/stock-meta.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, SidenavDirective, MatInputModule, FormsModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  ticker = new FormControl('');

  constructor(private router: Router) {}

  searchTicker() {
    this.router.navigate(['searchticker/', this.ticker.value?.toUpperCase()])
  }
}
