import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryRegistrationComponent } from './country-registration.component';

describe('CountryRegistrationComponent', () => {
  let component: CountryRegistrationComponent;
  let fixture: ComponentFixture<CountryRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryRegistrationComponent]
    });
    fixture = TestBed.createComponent(CountryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
