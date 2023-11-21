import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';

@Component({
  selector: 'app-country-registration',
  templateUrl: './country-registration.component.html',
  styleUrls: ['./country-registration.component.scss'],
})
export class CountryRegistrationComponent {
  selectedItemNgModel: any;
  selectedItemFormControl = new FormControl();
  countryForm: FormGroup;
  get_Phase_Data: any = {};
  // options: any[];
  country_options = [
    {
      id: 1,
      country: 'India',
      flag: 'flag-icon-in flag-icon-squared',
      country_type: 'Frequent Countries',
    },
    {
      id: 2,
      country: 'U.S.',
      flag: 'flag-icon-us flag-icon-squared',
      country_type: 'Frequent Countries',
    },
    {
      id: 3,
      country: 'Australia',
      flag: 'flag-icon-au flag-icon-squared',
      country_type: 'Frequent Countries',
    },
    {
      id: 4,
      country: 'Canada',
      flag: 'flag-icon-ca flag-icon-squared',
      country_type: 'Frequent Countries',
    },
    {
      id: 5,
      country: 'United Kingdom',
      flag: 'flag-icon-gb flag-icon-squared',
      country_type: 'Other Countries',
    },
    {
      id: 6,
      country: 'France',
      flag: 'flag-icon-fr flag-icon-squared',
      country_type: 'Other Countries',
    },
    {
      id: 7,
      country: 'Germany',
      flag: 'flag-icon-de flag-icon-squared',
      country_type: 'Other Countries',
    },
    {
      id: 8,
      country: 'Japan',
      flag: 'flag-icon-jp flag-icon-squared',
      country_type: 'Other Countries',
    },
    {
      id: 9,
      country: 'Russia',
      flag: 'flag-icon-ru flag-icon-squared',
      country_type: 'Other Countries',
    },
  ];
  // filteredOptions$: Observable<any[]>;
  flag_Icon = '';
  @ViewChild('autoInput') input: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    this.countryForm = this.formBuilder.group({
      countryLocation: ['India', Validators.required],
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
      this.countryForm.setValue({
        countryLocation: this.get_Phase_Data?.country_of_registraion
          ? this.get_Phase_Data?.country_of_registraion
          : '',
      });
    }
  }
  selectCountry() {
    if (this.countryForm.valid) {
      // const account_Object = {
      //   type_of_account: this.findCompanyForm?.value?.account_type,
      //   country_of_registraion: null,
      //   create_account: null,
      //   email_verification: null,
      //   mobile_verification: null,
      // }
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES,
        JSON.stringify({
          ...this.get_Phase_Data,
          country_of_registraion: this.countryForm?.value?.countryLocation,
          path: this.router.url,
        })
      );
      this.router.navigate(['/account-verification/create-account']);
      console.log(this.countryForm.value);
    } else if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
    }
  }
}
