import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserIdentityComponent } from './verify-user-identity.component';

describe('VerifyIdentityComponent', () => {
  let component: VerifyUserIdentityComponent;
  let fixture: ComponentFixture<VerifyUserIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyUserIdentityComponent],
    });
    fixture = TestBed.createComponent(VerifyUserIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
