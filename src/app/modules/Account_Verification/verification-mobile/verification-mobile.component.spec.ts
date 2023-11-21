import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationMobileComponent } from './verification-mobile.component';

describe('VerificationMobileComponent', () => {
  let component: VerificationMobileComponent;
  let fixture: ComponentFixture<VerificationMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationMobileComponent]
    });
    fixture = TestBed.createComponent(VerificationMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
