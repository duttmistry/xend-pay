import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsControlProofOfIdentityComponent } from './persons-control-proof-of-identity.component';

describe('PersonsControlProofOfIdentityComponent', () => {
  let component: PersonsControlProofOfIdentityComponent;
  let fixture: ComponentFixture<PersonsControlProofOfIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsControlProofOfIdentityComponent]
    });
    fixture = TestBed.createComponent(PersonsControlProofOfIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
