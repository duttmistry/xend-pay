import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmShareholdersComponent } from './confirm-shareholders.component';

describe('ConfirmShareholdersComponent', () => {
  let component: ConfirmShareholdersComponent;
  let fixture: ComponentFixture<ConfirmShareholdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmShareholdersComponent]
    });
    fixture = TestBed.createComponent(ConfirmShareholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
