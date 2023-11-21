import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualVerifyIdentityComponent } from './individual-verify-identity.component';

describe('IndividualVerifyIdentityComponent', () => {
  let component: IndividualVerifyIdentityComponent;
  let fixture: ComponentFixture<IndividualVerifyIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualVerifyIdentityComponent]
    });
    fixture = TestBed.createComponent(IndividualVerifyIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
