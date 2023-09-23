import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.routes),
    //canActivate: [authGuard],
  },
  {
    path: 'stock',
    loadComponent: () => import('./shared/stock-chart/stock-chart.component').then(m => m.StockChartComponent),
  }
];
