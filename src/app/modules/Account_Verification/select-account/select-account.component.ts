import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss'],
})
export class SelectAccountComponent {
  personalClicked = false;
  generalClicked = false;
  accountForm!: FormGroup;
  get_Phase_Data: any = {};
  sectionData: any[] = [];
  account_Arr = [
    {
      icon: 'person.png',
      title: 'Select Account',
      description:
        "You're self employed or a freelancer and hold complete ownership of your business.",
    },
    {
      icon: 'people.png',
      title: 'Registered Company',
      description:
        'Your company is registered with UK Companies House. You must be a director of the company to open an account',
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private storageService: StorageService
  ) {
    this.initializeSearchForm();
    this.Change_section_Data_Satus();
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
      this.accountForm.setValue({
        account_type: this.get_Phase_Data?.type_of_account
          ? this.get_Phase_Data?.type_of_account
          : '',
      });
    }
  }

  Change_section_Data_Satus() {
    const section_data: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.SECTIONS_DATA
    );
    if (section_data) {
      this.sectionData = JSON.parse(section_data)
        ? JSON.parse(section_data)
        : this.sectionData;
    }
    const index = this.sectionData.findIndex(
      (data: any) => data?.text === 'account_verification'
    );
    if (index >= 0) {
      this.sectionData[index].status = 'In Progress';
      this.sectionData[index].icon = 'minus-circle';
      this.sectionData[index].color = 'warning';
    }
    this.storageService.setIntoLocalStorage(
      STORAGE_CONSTANTS.SECTIONS_DATA,
      JSON.stringify(this.sectionData)
    );
  }
  initializeSearchForm() {
    this.accountForm = this.formBuilder.group({
      account_type: ['', [Validators.required]],
    });
  }
  get accountForm_get() {
    return this.accountForm.get('account_type');
  }
  selectAccount() {
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
      // const account_Object = {
      //   type_of_account: this.accountForm?.value?.account_type,
      //   country_of_registraion: null,
      //   create_account: null,
      //   email_verification: null,
      //   mobile_verification: null,
      // }
      console.log(
        'this.accountForm?.value?.account_type: ',
        this.accountForm?.value?.account_type
      );
      if (
        this.get_Phase_Data?.type_of_account ==
        this.accountForm?.value?.account_type
      ) {
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES,
          JSON.stringify({
            ...this.get_Phase_Data,
            type_of_account: this.accountForm?.value?.account_type,
          })
        );
      } else {
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES,
          JSON.stringify({
            type_of_account: this.accountForm?.value?.account_type,
            country_of_registraion: 'India',
            create_account: {
              firstname: '',
              middlename: '',
              lastname: '',
              email: '',
              password: '',
              mobilenumber: '',
              countryLocation: '+91',
              termsandcoditions: false,
            },
            email_verification: null,
            mobile_verification: null,
            path: this.route.url,
          })
        );
      }
      this.route.navigate(['/account-verification/country-registration']);
      // this.route.navigate(['/account-verification/country-registration'])
    } else if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
    }
  }
}
