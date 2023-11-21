import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProofOfIdentityComponent } from './individual-proof-of-identity.component';

describe('IndividualProofOfIdentityComponent', () => {
  let component: IndividualProofOfIdentityComponent;
  let fixture: ComponentFixture<IndividualProofOfIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualProofOfIdentityComponent]
    });
    fixture = TestBed.createComponent(IndividualProofOfIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
