import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeronsControlHomeComponent } from './perons-control-home.component';

describe('PeronsControlHomeComponent', () => {
  let component: PeronsControlHomeComponent;
  let fixture: ComponentFixture<PeronsControlHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeronsControlHomeComponent]
    });
    fixture = TestBed.createComponent(PeronsControlHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
