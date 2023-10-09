import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/component/stock-card/stock-card.component').then(m => m.StockCardComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.routes),
    //canActivate: [authGuard],
  },
  {
    path: 'stockhistory/:ticker',
    loadComponent: () => import('./shared/component/stock-chart/stock-chart.component').then(m => m.StockChartComponent),
  }
];
