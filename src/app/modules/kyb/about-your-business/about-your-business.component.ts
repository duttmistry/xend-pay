import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-about-your-business',
  templateUrl: './about-your-business.component.html',
  styleUrls: ['./about-your-business.component.scss'],
})
export class AboutYourBusinessComponent {
  aboutYourBusinessForm: FormGroup;
  sectionData: any[] = [];
  kybData: any = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    this.aboutYourBusinessForm = this.fb.group({
      industry: ['', Validators.required],
      annualTurnOver: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]*$/)],
      ],
      countriesSendingMoneyFrom: [[], Validators.required],
      inWhatCurrencyFrom: ['', Validators.required],
      countriesSendingMoneyTo: ['', Validators.required],
      inWhatCurrencyTo: ['', Validators.required],
    });
    this.Change_section_Data_Satus();
    this.setFormData();
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
      (data: any) => data?.text === 'additional_information'
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
    const phaseData: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.KYB_DATA
    );
    if (phaseData) {
      this.kybData = JSON.parse(phaseData)
        ? JSON.parse(phaseData)
        : this.kybData;
      // console.log('this.kybData: ', this.kybData);
    }
  }
  ngOnInit() { }
  get formControls() {
    return this.aboutYourBusinessForm.controls;
  }
  industryOptions = ['Banking and Finance', 'Insurance'];
  currencyOptions = [
    'USD ($)',
    'INR (₹)',
    'EUR (€)',
    'GBP (£)',
    'CAD (C$)',
    'JPY (¥)',
  ];
  selectedPeople = []
  countryOptions_To = [
    {
      id: 1,
      country: 'India',
      flag: 'flag-icon-in flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 2,
      country: 'U.S.',
      flag: 'flag-icon-us flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 3,
      country: 'Australia',
      flag: 'flag-icon-au flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 4,
      country: 'Canada',
      flag: 'flag-icon-ca flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 5,
      country: 'United Kingdom',
      flag: 'flag-icon-gb flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 6,
      country: 'France',
      flag: 'flag-icon-fr flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 7,
      country: 'Germany',
      flag: 'flag-icon-de flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 8,
      country: 'Japan',
      flag: 'flag-icon-jp flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 9,
      country: 'Russia',
      flag: 'flag-icon-ru flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
  ];
  countryOptions_From = [
    {
      id: 1,
      country: 'India',
      flag: 'flag-icon-in flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 2,
      country: 'U.S.',
      flag: 'flag-icon-us flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 3,
      country: 'Australia',
      flag: 'flag-icon-au flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 4,
      country: 'Canada',
      flag: 'flag-icon-ca flag-icon-squared',
      country_type: 'Frequent Countries',
      selected: false
    },
    {
      id: 5,
      country: 'United Kingdom',
      flag: 'flag-icon-gb flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 6,
      country: 'France',
      flag: 'flag-icon-fr flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 7,
      country: 'Germany',
      flag: 'flag-icon-de flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 8,
      country: 'Japan',
      flag: 'flag-icon-jp flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
    {
      id: 9,
      country: 'Russia',
      flag: 'flag-icon-ru flag-icon-squared',
      country_type: 'Other Countries',
      selected: false
    },
  ];
  next() {
    // console.log('this.aboutYourBusinessForm?.value: ', this.aboutYourBusinessForm?.value);
    // console.log('this.kybData: ', this.kybData);
    if (this.aboutYourBusinessForm?.valid) {
      const default_Object: any = {
        ...this.kybData
      }
      const kyb_object: any = {
        about_your_business: this.aboutYourBusinessForm?.value,
        path: this.router.url,
      };
      const Obj = {
        ...default_Object,
        ...kyb_object
      }
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.KYB_DATA,
        JSON.stringify(Obj)
      );
      this.router.navigate(['/additional-information/help-your-business']);
    }
  }
  setFormData() {
    const temp: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.KYB_DATA
    );
    const formValues = JSON.parse(temp);
    // console.log('%c  formValues:', 'color: #0e93e0;background: #aaefe5;', formValues);
    // console.log('%c  formValues:', 'color: #0e93e0;background: #aaefe5;', JSON.parse(formValues));

    if (formValues) {
      this.aboutYourBusinessForm.patchValue(formValues?.about_your_business);
    } else {
      this.aboutYourBusinessForm.setValue({
        industry: '',
        annualTurnOver: '',
        countriesSendingMoneyFrom: '',
        inWhatCurrencyFrom: '',
        countriesSendingMoneyTo: '',
        inWhatCurrencyTo: '',
      });
    }
  }
  Checked(item: any, type: any) {
    if (type == "countriesSendingMoneyFrom") {
      if (item.selected == false) {
        this.countryOptions_From?.find((element: any) => {
          if (element.id == item.id) {
            element.selected = true;
          }
        })
      }
      else {
        this.countryOptions_From?.find((element: any) => {
          if (element.id == item.id) {
            element.selected = false;
          }
        })
      }
    } else if (type == "countriesSendingMoneyTo") {
      if (item.selected == false) {
        this.countryOptions_To?.find((element: any) => {
          if (element.id == item.id) {
            element.selected = true;
          }
        })
      }
      else {
        this.countryOptions_To?.find((element: any) => {
          if (element.id == item.id) {
            element.selected = false;
          }
        })
      }
    }
  }
  CheckItems(item: any, type: any) {
    if (type == "countriesSendingMoneyFrom") {
      const countries = this.aboutYourBusinessForm.value.countriesSendingMoneyFrom
      if (countries.length > 0 && countries.find((country: any) => country == item.country)) {
        return true
      } else {
        return false
      }
    } else if (type == "countriesSendingMoneyTo") {
      const countries = this.aboutYourBusinessForm.value.countriesSendingMoneyTo
      if (countries.length > 0 && countries.find((country: any) => country == item.country)) {
        return true
      } else {
        return false
      }
    } return false
  }
}
