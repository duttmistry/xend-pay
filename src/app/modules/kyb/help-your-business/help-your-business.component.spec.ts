import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpYourBusinessComponent } from './help-your-business.component';

describe('HelpYourBusinessComponent', () => {
  let component: HelpYourBusinessComponent;
  let fixture: ComponentFixture<HelpYourBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpYourBusinessComponent]
    });
    fixture = TestBed.createComponent(HelpYourBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
