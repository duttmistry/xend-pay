import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsControlProofOfAddressComponent } from './persons-control-proof-of-address.component';

describe('PersonsControlProofOfAddressComponent', () => {
  let component: PersonsControlProofOfAddressComponent;
  let fixture: ComponentFixture<PersonsControlProofOfAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsControlProofOfAddressComponent]
    });
    fixture = TestBed.createComponent(PersonsControlProofOfAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
