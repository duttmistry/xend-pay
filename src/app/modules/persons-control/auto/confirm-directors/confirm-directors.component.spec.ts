import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDirectorsComponent } from './confirm-directors.component';

describe('ConfirmDirectorsComponent', () => {
  let component: ConfirmDirectorsComponent;
  let fixture: ComponentFixture<ConfirmDirectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDirectorsComponent]
    });
    fixture = TestBed.createComponent(ConfirmDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
