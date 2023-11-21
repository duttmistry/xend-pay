import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsControlVerifyIdentityComponent } from './persons-control-verify-identity.component';

describe('PersonsControlVerifyIdentityComponent', () => {
  let component: PersonsControlVerifyIdentityComponent;
  let fixture: ComponentFixture<PersonsControlVerifyIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsControlVerifyIdentityComponent]
    });
    fixture = TestBed.createComponent(PersonsControlVerifyIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
