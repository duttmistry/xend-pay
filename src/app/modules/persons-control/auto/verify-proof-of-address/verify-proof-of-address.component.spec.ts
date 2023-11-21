import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProofOfAddressComponent } from './verify-proof-of-address.component';

describe('VerifyProofOfAddressComponent', () => {
  let component: VerifyProofOfAddressComponent;
  let fixture: ComponentFixture<VerifyProofOfAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyProofOfAddressComponent]
    });
    fixture = TestBed.createComponent(VerifyProofOfAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
