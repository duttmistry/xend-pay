import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserDetailsComponent } from './verify-user-details.component';

describe('VerifyUserDetailsComponent', () => {
  let component: VerifyUserDetailsComponent;
  let fixture: ComponentFixture<VerifyUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyUserDetailsComponent]
    });
    fixture = TestBed.createComponent(VerifyUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
