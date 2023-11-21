import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmShareholdersVerifyComponent } from './confirm-shareholders-verify.component';

describe('ConfirmShareholdersVerifyComponent', () => {
  let component: ConfirmShareholdersVerifyComponent;
  let fixture: ComponentFixture<ConfirmShareholdersVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmShareholdersVerifyComponent]
    });
    fixture = TestBed.createComponent(ConfirmShareholdersVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
