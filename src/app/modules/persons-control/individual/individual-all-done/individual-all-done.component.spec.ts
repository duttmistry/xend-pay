import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAllDoneComponent } from './individual-all-done.component';

describe('IndividualAllDoneComponent', () => {
  let component: IndividualAllDoneComponent;
  let fixture: ComponentFixture<IndividualAllDoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualAllDoneComponent]
    });
    fixture = TestBed.createComponent(IndividualAllDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
