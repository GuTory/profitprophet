import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Observable, of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {PolygonRestService} from "../stock-service/polygon-rest/polygon-rest.service";
import {IAggsPreviousClose} from "@polygon.io/client-js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  providers: [PolygonRestService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'profitProphetFrontend';
}
