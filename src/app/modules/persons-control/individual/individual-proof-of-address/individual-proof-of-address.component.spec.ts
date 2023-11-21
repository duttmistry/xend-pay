import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProofOfAddressComponent } from './individual-proof-of-address.component';

describe('IndividualProofOfAddressComponent', () => {
  let component: IndividualProofOfAddressComponent;
  let fixture: ComponentFixture<IndividualProofOfAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualProofOfAddressComponent]
    });
    fixture = TestBed.createComponent(IndividualProofOfAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
