import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doDecrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-verification-mobile',
  templateUrl: './verification-mobile.component.html',
  styleUrls: ['./verification-mobile.component.scss'],
})
export class VerificationMobileComponent {
  mobile_number = '08537443993';
  title = `Verification code has been sent to ${this.mobile_number}`;
  verification_form: FormGroup;
  sectionData: any[] = [];
  get_Phase_Data: any = {};
  @ViewChild('autoInput') input: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    const section_data: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.SECTIONS_DATA
    );
    if (section_data) {
      this.sectionData = JSON.parse(section_data)
        ? JSON.parse(section_data)
        : this.sectionData;
    }
    this.verification_form = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.get_Account_Verification_Data();
  }

  get_Account_Verification_Data() {
    const data: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES
    );
    if (data) {
      this.get_Phase_Data = JSON.parse(data)
        ? JSON.parse(data)
        : this.get_Phase_Data;
      this.verification_form.setValue({
        verificationCode: this.get_Phase_Data?.mobile_verification
          ? this.get_Phase_Data?.mobile_verification
          : '',
      });
    }
  }

  get formControls() {
    return this.verification_form.controls;
  }
  verifyCode(form_Data: any) {
    if (this.verification_form.valid) {
      const index = this.sectionData.findIndex(
        (data: any) => data?.text === 'account_verification'
      );
      if (index >= 0) {
        this.sectionData[index].status = 'Completed';
        this.sectionData[index].icon = 'checkmark-circle-2';
        this.sectionData[index].color = '#37AB87';
        this.sectionData[index].flag = false;
        this.sectionData[index + 1].flag = true;
        this.sectionData[index + 1].status = 'Click to Complete';
        this.sectionData[index + 1].icon = 'alert-triangle-outline';
        this.sectionData[index + 1].color = '#667085';
      }
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.SECTIONS_DATA,
        JSON.stringify(this.sectionData)
      );
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES,
        JSON.stringify({
          ...this.get_Phase_Data,
          mobile_verification: this.verification_form?.value?.verificationCode,
          path: this.router.url,
        })
      );
      this.router.navigate(['/']);
    } else if (this.verification_form.invalid) {
      this.verification_form.markAllAsTouched();
    }
  }

  //OTP Code

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.verification_form.setValue({
      verificationCode: code,
    });
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.verification_form.setValue({
      verificationCode: code,
    });
  }
}
