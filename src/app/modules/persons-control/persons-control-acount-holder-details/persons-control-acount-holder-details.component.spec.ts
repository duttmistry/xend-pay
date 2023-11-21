import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsControlAcountHolderDetailsComponent } from './persons-control-acount-holder-details.component';

describe('PersonsControlAcountHolderDetailsComponent', () => {
  let component: PersonsControlAcountHolderDetailsComponent;
  let fixture: ComponentFixture<PersonsControlAcountHolderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonsControlAcountHolderDetailsComponent]
    });
    fixture = TestBed.createComponent(PersonsControlAcountHolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
