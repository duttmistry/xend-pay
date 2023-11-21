import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuallyTradingAddressComponent } from './manually-trading-address.component';

describe('ManuallyTradingAddressComponent', () => {
  let component: ManuallyTradingAddressComponent;
  let fixture: ComponentFixture<ManuallyTradingAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManuallyTradingAddressComponent]
    });
    fixture = TestBed.createComponent(ManuallyTradingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
