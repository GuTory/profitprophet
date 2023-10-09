import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHistoryComponent } from './stock-history.component';

describe('StockChartComponent', () => {
  let component: StockHistoryComponent;
  let fixture: ComponentFixture<StockHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StockHistoryComponent]
    });
    fixture = TestBed.createComponent(StockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
