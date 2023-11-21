import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, map, of } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { SHAREHOLDERS } from 'src/app/core/Services/common/person-of-control-stackholders';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-persons-control-acount-holder-details',
  templateUrl: './persons-control-acount-holder-details.component.html',
  styleUrls: ['./persons-control-acount-holder-details.component.scss'],
})
export class PersonsControlAcountHolderDetailsComponent {
  //#region [Data Members]
  person_of_control_data: any = {}
  accountHolderDetails: FormGroup = new FormGroup({
    firstName: new FormControl({
      value: '',
      disabled: true,
    }),
    lastName: new FormControl({
      value: '',
      disabled: true,
    }),
    city: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    role: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    mobilenumber: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required, Validators.pattern('^[0-9]*$')]
    ),
    countryLocation: new FormControl(
      {
        value: '',
        disabled: true,
      },
      Validators.required
    ),
  });
  companyRoles: any = [
    { key: 'Directors', value: 'Directors', selected: false },
    { key: 'Shareholders', value: 'Shareholders', selected: false },
    { key: 'Authorized Signatory', value: 'Authorized Signatory', selected: false },
  ];
  filteredOptions$: Observable<any[]>;

  @ViewChild('autoInput') input: any;
  flag_Icon = '';
  countries: any[];
  get_Phase_Data: any = {};
  listofDirectors = LISTOFUSERS;
  business_details_data: any = {}
  country_options = [
    { id: 1, country: 'India', flag: 'flag-icon-in flag-icon-squared', country_type: "Frequent Countries" },
    { id: 2, country: 'U.S.', flag: 'flag-icon-us flag-icon-squared', country_type: "Frequent Countries" },
    { id: 3, country: 'Australia', flag: 'flag-icon-au flag-icon-squared', country_type: "Frequent Countries" },
    { id: 4, country: 'Canada', flag: 'flag-icon-ca flag-icon-squared', country_type: "Frequent Countries" },
    { id: 5, country: 'United Kingdom', flag: 'flag-icon-gb flag-icon-squared', country_type: "Other Countries" },
    { id: 6, country: 'France', flag: 'flag-icon-fr flag-icon-squared', country_type: "Other Countries" },
    { id: 7, country: 'Germany', flag: 'flag-icon-de flag-icon-squared', country_type: "Other Countries" },
    { id: 8, country: 'Japan', flag: 'flag-icon-jp flag-icon-squared', country_type: "Other Countries" },
    { id: 9, country: 'Russia', flag: 'flag-icon-ru flag-icon-squared', country_type: "Other Countries" },
  ];
  //#endregion

  //#region [Member Functions]
  constructor(private router: Router, private storageService: StorageService) {
    this.countries = [
      {
        country_code: '+91',
        flag: 'flag-icon-in flag-icon-squared',
        name: 'India',
        id: 1,
      },
      {
        country_code: '+1',
        flag: 'flag-icon-us flag-icon-squared',
        name: 'U.S.',
        id: 2,
      },
      {
        country_code: '+61',
        flag: 'flag-icon-au flag-icon-squared',
        name: 'Australia',
        id: 3,
      },
    ];
    this.filteredOptions$ = of(this.countries);
    localStorage.removeItem('addressProofUploaded');
    localStorage.removeItem('proofOfidentityUploaded');
    this.get_Account_Verification_Data()
    this.get_business_details_data()
    this.get_person_of_control_data()
    // const directors_List: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST)
    // if (directors_List) {
    //   this.directors_List = JSON.parse(directors_List) ? JSON.parse(directors_List) : this.directors_List;
    //   this.listofDirectors = this.directors_List ? this.directors_List : LISTOFUSERS
    //   console.log('this.listofDirectors: ', this.listofDirectors);
    // }
  }
  checkDateFormat(dateString: string): string {
    const isoFormat = moment(dateString, moment.ISO_8601, true).isValid();
    const customFormat = moment(dateString, "DD/MM/YYYY", true).isValid();

    if (isoFormat) {
      return "ISO";
    } else if (customFormat) {
      return "Custom";
    } else {
      return "Unknown";
    }
  }
  get_person_of_control_data() {
    const person_of_control_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES)
    if (person_of_control_data) {
      this.person_of_control_data = JSON.parse(person_of_control_data) ? JSON.parse(person_of_control_data) : this.person_of_control_data;
      if (this.person_of_control_data?.account_holding_data) {
        this.accountHolderDetails.patchValue(this.person_of_control_data?.account_holding_data)
        const dob = this.person_of_control_data?.account_holding_data?.dateOfBirth ? moment(this.person_of_control_data?.account_holding_data?.dateOfBirth).utc().format("DD/MM/YYYY") : ''
        const data = this.checkDateFormat(this.person_of_control_data.account_holding_data.dateOfBirth)
        if (data == "ISO") {
          this.accountHolderDetails.patchValue({
            dateOfBirth: dob,
          })
        } else if (data == "Custom") {
          this.accountHolderDetails.patchValue({
            dateOfBirth: this.person_of_control_data?.account_holding_data?.dateOfBirth,
          })

        } else {
          this.accountHolderDetails.patchValue({
            dateOfBirth: "",
          })
        }
      }
    }
  }
  get_Account_Verification_Data() {
    const data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES)
    if (data) {
      this.get_Phase_Data = JSON.parse(data) ? JSON.parse(data) : this.get_Phase_Data;
      console.log('this.get_Phase_Data: ', this.get_Phase_Data);
      if (this.get_Phase_Data?.create_account) {
        this.accountHolderDetails.patchValue({
          firstName: this.get_Phase_Data?.create_account?.firstname ? (this.get_Phase_Data?.create_account?.firstname + " " + this.get_Phase_Data?.create_account?.middlename) : "",
          lastName: this.get_Phase_Data?.create_account?.lastname ? this.get_Phase_Data?.create_account?.lastname : "",
          mobilenumber: this.get_Phase_Data?.create_account?.mobilenumber ? this.get_Phase_Data?.create_account?.mobilenumber : "",
          countryLocation: this.get_Phase_Data?.create_account?.countryLocation ? this.get_Phase_Data?.create_account?.countryLocation : "",
          country: this.get_Phase_Data?.country_of_registraion ? this.get_Phase_Data?.country_of_registraion : "",
        })
      }
    }
  }

  get_business_details_data() {
    const data: any = localStorage.getItem('business_details')
    if (data) {
      this.business_details_data = JSON.parse(data) ? JSON.parse(data) : this.business_details_data;
      console.log('thisbusinessdetails: ', this.business_details_data);
      if (this.business_details_data?.companyDetails) {
        this.accountHolderDetails.patchValue({
          addressLine1: this.business_details_data?.companyDetails?.address_line_1 ? this.business_details_data?.companyDetails?.address_line_1 : "",
          addressLine2: this.business_details_data?.companyDetails?.address_line_2 ? this.business_details_data?.companyDetails?.address_line_2 : "",
          city: this.business_details_data?.companyDetails?.city ? this.business_details_data?.companyDetails?.city : "",
        })
      }
    }
  }
  get accountHolderDetailsForm() {
    return this.accountHolderDetails.controls;
  }
  getFilteredOptions(value: string): Observable<any[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.flag_Icon = '';
    return this.countries.filter((option) =>
      option.country_code.toLowerCase().includes(filterValue)
    );
  }
  onSelectionChange($event: any) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }
  getOptionHtml(option: { country_code: string; flag: string }): string {
    this.flag_Icon = 'flag-icon ' + option.flag;
    return (
      `<span class="flag-icon ${option.flag}"></span>` +
      '  ' +
      `${option.country_code}`
    );
  }
  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
  }
  _onSubmit() {
    if (this.accountHolderDetails.valid) {
      if (this.person_of_control_data)
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES,
          JSON.stringify({
            ...this.person_of_control_data,
            account_holding_data: {
              ...this.accountHolderDetails.value,
              firstName: this.get_Phase_Data?.create_account?.firstname ? this.get_Phase_Data?.create_account?.firstname : "",
              middleName: this.get_Phase_Data?.create_account?.middlename ? this.get_Phase_Data?.create_account?.middlename : "",
              lastName: this.get_Phase_Data?.create_account?.lastname ? this.get_Phase_Data?.create_account?.lastname : "",
              mobilenumber: this.get_Phase_Data?.create_account?.mobilenumber ? this.get_Phase_Data?.create_account?.mobilenumber : "",
              countryLocation: this.get_Phase_Data?.create_account?.countryLocation ? this.get_Phase_Data?.create_account?.countryLocation : "",
              country: this.get_Phase_Data?.country_of_registraion ? this.get_Phase_Data?.country_of_registraion : "",
            },
            account_holder_flow: false
          })
        );

      ///directors Data Add
      console.log('this.business_details_data?.isAuto: ', this.business_details_data);
      if (this.business_details_data?.isAuto) {
        if (this.accountHolderDetails?.value?.role == "Directors") {

          const directorsList = [
            {
              ...this.accountHolderDetails.value,
              firstName: this.get_Phase_Data?.create_account?.firstname ? this.get_Phase_Data?.create_account?.firstname : "",
              middleName: this.get_Phase_Data?.create_account?.middlename ? this.get_Phase_Data?.create_account?.middlename : "",
              lastName: this.get_Phase_Data?.create_account?.lastname ? this.get_Phase_Data?.create_account?.lastname : "",
              mobilenumber: this.get_Phase_Data?.create_account?.mobilenumber ? this.get_Phase_Data?.create_account?.mobilenumber : "",
              countryLocation: this.get_Phase_Data?.create_account?.countryLocation ? this.get_Phase_Data?.create_account?.countryLocation : "",
              isAccountHolder: true,
              verificationStatus: 'Please verify',
              altProfileText: (this.get_Phase_Data?.create_account?.firstname?.[0] ? this.get_Phase_Data?.create_account?.firstname?.[0]?.toUpperCase() : "") + (this.get_Phase_Data?.create_account?.lastname?.[0] ? this.get_Phase_Data?.create_account?.lastname?.[0]?.toUpperCase() : ""),
            },
            ...LISTOFUSERS
          ]
          console.log('directorsList: ', directorsList);
          this.storageService.setIntoLocalStorage(
            STORAGE_CONSTANTS.DIRECTORS_LIST,
            JSON.stringify(
              directorsList
            )
          );
        }
        else if (this.accountHolderDetails?.value?.role == "Shareholders") {
          const shareholdersList = [
            {
              ...this.accountHolderDetails.value,
              firstName: this.get_Phase_Data?.create_account?.firstname ? this.get_Phase_Data?.create_account?.firstname : "",
              middleName: this.get_Phase_Data?.create_account?.middlename ? this.get_Phase_Data?.create_account?.middlename : "",
              lastName: this.get_Phase_Data?.create_account?.lastname ? this.get_Phase_Data?.create_account?.lastname : "",
              mobilenumber: this.get_Phase_Data?.create_account?.mobilenumber ? this.get_Phase_Data?.create_account?.mobilenumber : "",
              countryLocation: this.get_Phase_Data?.create_account?.countryLocation ? this.get_Phase_Data?.create_account?.countryLocation : "",
              isAccountHolder: true,
              verificationStatus: 'Verified',
              altProfileText: (this.get_Phase_Data?.create_account?.firstname?.[0] ? this.get_Phase_Data?.create_account?.firstname?.[0]?.toUpperCase() : "") + (this.get_Phase_Data?.create_account?.lastname?.[0] ? this.get_Phase_Data?.create_account?.lastname?.[0]?.toUpperCase() : ""),
            },
            ...SHAREHOLDERS

          ]
          console.log('shareholdersList: ', shareholdersList);
          this.storageService.setIntoLocalStorage(
            STORAGE_CONSTANTS.SHAREHOLDERS_LIST,
            JSON.stringify(
              shareholdersList
            )
          );
        }
      } else {
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.DIRECTORS_LIST,
          JSON.stringify(
            []
          )
        );
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.SHAREHOLDERS_LIST,
          JSON.stringify(
            []
          )
        );
      }

      this.router.navigate([
        '/persons-of-control/account-holder-verify-identity',
      ]);
    }
  }
  CheckedItem(item: any) {
    const roles = this.accountHolderDetails.value.role
    if (roles && (roles == item.value)) {
      return true
    } else {
      return false
    }
  }
  Checked(item: any) {
    console.log('item: ', item);
    if (item.selected == false) {
      this.companyRoles?.find((element: any) => {
        if (element.key == item.key) {
          element.selected = true;
        }
      })
    }
    else {
      this.companyRoles?.find((element: any) => {
        if (element.key == item.key) {
          element.selected = false;
        }
      })
    }
  }

  //#endregion
}
