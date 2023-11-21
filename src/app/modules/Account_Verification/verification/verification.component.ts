import { StorageService } from './../../../core/Services/common/storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { CodeInputComponent } from 'angular-code-input';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  // email = "hr@cybercom.co.in"
  email = "johndoe@gmail.com"
  title = `Verification code has been sent to ${this.email}`
  verification_form: FormGroup;
  get_Phase_Data: any = {}
  @ViewChild('autoInput') input: any;
  @ViewChild('codeInput') codeInput !: CodeInputComponent;
  constructor(private formBuilder: FormBuilder, private router: Router, private storageService: StorageService) {
    this.verification_form = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.get_Account_Verification_Data()
  }

  get_Account_Verification_Data() {
    const data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES)
    if (data) {
      this.get_Phase_Data = JSON.parse(data) ? JSON.parse(data) : this.get_Phase_Data;
      console.log('this.get_Phase_Data?.email_verification: ', this.get_Phase_Data?.email_verification);
      this.verification_form.patchValue({
        verificationCode: this.get_Phase_Data?.email_verification ? this.get_Phase_Data?.email_verification : "",
      })
      this.codeInput = this.get_Phase_Data?.email_verification ? this.get_Phase_Data?.email_verification : "";
    }
  }

  get formControls() {
    return this.verification_form.controls;
  }
  verifyCode(form_Data: any) {
    if (this.verification_form.valid) {
      console.log('this.verification_form.value: ', this.verification_form.value);
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES,
        JSON.stringify({
          ...this.get_Phase_Data,
          email_verification: this.verification_form?.value?.verificationCode,
          path: this.router.url,
        })
      );
      this.router.navigate(['/account-verification/verification-mobile']);
    } else if (this.verification_form.invalid) {
      this.verification_form.markAllAsTouched();
    }
  }


  //OTP Code 

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.verification_form.setValue({
      verificationCode: code
    })
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.verification_form.setValue({
      verificationCode: code
    })
  }
}
