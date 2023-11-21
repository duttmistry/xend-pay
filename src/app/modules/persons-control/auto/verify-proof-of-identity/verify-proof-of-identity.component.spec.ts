import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProofOfIdentityComponent } from './verify-proof-of-identity.component';

describe('VerifyProofOfIdentityComponent', () => {
  let component: VerifyProofOfIdentityComponent;
  let fixture: ComponentFixture<VerifyProofOfIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyProofOfIdentityComponent]
    });
    fixture = TestBed.createComponent(VerifyProofOfIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
