import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, map, of, startWith, findIndex } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doDecrypt } from 'src/app/utils/encryption';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-verify-user-details',
  templateUrl: './verify-user-details.component.html',
  styleUrls: ['./verify-user-details.component.scss'],
})
export class VerifyUserDetailsComponent {
  userDetails: any = null;
  firstName: any = ""
  lastName: any = ""
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
  encUserId = '';
  listofDirectors = LISTOFUSERS;
  backPath = 'persons-of-control/verify-user-identity/';
  userDetailsToVerify: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    postalCode: new FormControl('', Validators.required),
    country: new FormControl('India', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    // mobilenumber: new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('^[0-9]*$'),
    // ]),
    countryLocation: new FormControl('+91', Validators.required),
  });
  companyRoles: any = [
    { key: 'Directors', value: 'Directors' },
    { key: 'Shareholders', value: 'Shareholders' },
    { key: 'Authorized Signatory', value: 'Authorized Signatory' },
  ];
  filteredOptions$: Observable<any[]>;

  @ViewChild('autoInput') input: any;
  flag_Icon = '';
  countries: any[];
  id: any
  options: any[];
  userType: any
  filteredControlOptions$: Observable<any[]>;
  directors_List: any = []
  shareholders_List: any = []
  title = 'Confirm your  details';
  tagLine = 'Please make sure the details match your ID';

  constructor(private activeRoute: ActivatedRoute, private router: Router, private storageService: StorageService) {
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

    this.options = [
      {
        postalCode: 'KA3 1BD',
        address_line_1: '02018151 - Riverside House',
        address_line_2: 'River Street, Henley-On-Thames, Ox',
        city: 'Streamsville',
      },
      {
        postalCode: 'KA5 1BD',
        address_line_1: '02018153 - Valley House',
        address_line_2: 'High Street, Oxford',
        city: 'Oxford',
      },
      {
        postalCode: 'KD5 1BD',
        address_line_1: '020181662 - Chiltern House',
        address_line_2: 'Station Road, Henley-On-Thames, Ox',
        city: 'Henley-On-Thames',
      },
      {
        postalCode: 'KE9 1BD',
        address_line_1: '123 Main Street',
        address_line_2: 'Springfield, IL',
        city: 'Springfield',
      },
    ];
    this.filteredControlOptions$ = of(this.options);
    const directors_List: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST)
    if (directors_List) {
      this.directors_List = JSON.parse(directors_List) ? JSON.parse(directors_List) : this.directors_List;
      this.get_Directors_Users()
    }
    const shareholders_List: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.SHAREHOLDERS_LIST)
    if (shareholders_List) {
      this.shareholders_List = JSON.parse(shareholders_List) ? JSON.parse(shareholders_List) : this.shareholders_List;
      this.get_Shareholders_Users()
    }
  }


  ngOnInit(): void {
    try {
      this.encUserId = this.activeRoute.snapshot.params['id'] || '';
      this.backPath += this.encUserId;
      const id = decodeURIComponent(this.encUserId);
      const decryptedId = _doDecrypt(id);
      // this.userDetails = this.listofDirectors.find(
      //   (user: any) => user.id.toString() === decryptedId
      // );
      const queryUserType = decodeURIComponent(
        this.activeRoute.snapshot.queryParams['userType'] || ''
      );
      const queryUserId = decodeURIComponent(
        this.activeRoute.snapshot.queryParams['id'] || ''
      );
      console.log('queryUserType: ', queryUserType);
      if (queryUserType) {
        const userType = _doDecrypt(queryUserType);
        this.userType = _doDecrypt(queryUserType);
        console.log('this.userType: ', this.userType);
        if (userType) {
          switch (userType.toString()) {
            case '1':
              this.title = 'Director details';
              this.tagLine =
                "Look through each section to confirm user's details";
              this.backPath = '/persons-of-control/confirm-directors';
              break;
            case '2':
              this.title = 'Shareholder details';
              this.tagLine =
                "Look through each section to confirm user's details";
              this.backPath = '/persons-of-control/confirm-shareholders';
              break;
          }
        }
      }
      this.filteredControlOptions$ = this.userDetailsToVerify.controls[
        'postalCode'
      ].valueChanges.pipe(
        startWith(''),
        map((filterString) => this.filterPostalCode(filterString))
      );
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/persons-of-control/confirm-shareholders']);
    }
  }

  get_Directors_Users() {
    const firstName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['firstName'] || ''
    );
    this.firstName = firstName ? _doDecrypt(firstName) : "";
    console.log('this.firstName: ', this.firstName);
    const lastName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['lastName'] || ''
    );
    this.lastName = lastName ? _doDecrypt(lastName) : "";
    this.directors_List?.map((element: any) => {
      if (element?.firstName == this.firstName && element?.lastName == this.lastName) {
        this.id = element?.id
        console.log('this.id: ', this.id);
        this.userDetailsToVerify.patchValue({
          firstName: element?.firstName ? element?.firstName : "",
          lastName: element?.lastName ? element?.lastName : "",
          city: element?.city ? element?.city : "",
          addressLine1: element?.addressLine1 ? element?.addressLine1 : '',
          addressLine2: element?.addressLine2 ? element?.addressLine2 : '',
          postalCode: element?.postalCode ? element?.postalCode : '',
          country: element?.country ? element?.country : '',
          dateOfBirth: moment(element?.dateOfBirth).format("DD/MM/YYYY") ? moment(element?.dateOfBirth).format("DD/MM/YYYY") : '',
          // mobilenumber: element?.mobilenumber ? element?.mobilenumber : '',
          countryLocation: element?.countryLocation ? element?.countryLocation : '',
        })
      }
    })
  }
  get_Shareholders_Users() {
    const firstName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['firstName'] || ''
    );
    this.firstName = firstName ? _doDecrypt(firstName) : "";
    console.log('this.firstName: ', this.firstName);
    const lastName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['lastName'] || ''
    );
    this.lastName = lastName ? _doDecrypt(lastName) : "";
    this.shareholders_List?.map((element: any) => {
      if (element?.firstName == this.firstName && element?.lastName == this.lastName) {
        this.id = element?.id
        console.log('this.id: ', this.id);
        this.userDetailsToVerify.patchValue({
          firstName: element?.firstName ? element?.firstName : "",
          lastName: element?.lastName ? element?.lastName : "",
          city: element?.city ? element?.city : "",
          addressLine1: element?.addressLine1 ? element?.addressLine1 : '',
          addressLine2: element?.addressLine2 ? element?.addressLine2 : '',
          postalCode: element?.postalCode ? element?.postalCode : '',
          country: element?.country ? element?.country : '',
          dateOfBirth: moment(element?.dateOfBirth).format("DD/MM/YYYY") ? moment(element?.dateOfBirth).format("DD/MM/YYYY") : '',
          // mobilenumber: element?.mobilenumber ? element?.mobilenumber : '',
          countryLocation: element?.countryLocation ? element?.countryLocation : '',
        })
      }
    })
  }
  get userDetailsToVerifyForm() {
    return this.userDetailsToVerify.controls;
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
    console.log('this.id: ', this.id);
    if (this.userType == "1") {
      const index = this.directors_List?.findIndex((element: any) =>
        element?.id == this.id
      )
      console.log('index: ', index);
      if (index >= 0) {
        this.directors_List[index] = {
          ...this.userDetailsToVerify.value,
          id: this.id ? this.id : uuid(),
          isAccountHolder: false,
          verificationStatus: 'Please verify',
          altProfileText: (this.userDetailsToVerify.value?.firstName?.[0] ? this.userDetailsToVerify.value?.firstName?.[0]?.toUpperCase() : "") + (this.userDetailsToVerify.value?.lastName?.[0] ? this.userDetailsToVerify.value?.lastName?.[0]?.toUpperCase() : ""),
        }

      } else {
        const directorList = [
          {
            ...this.userDetailsToVerify.value,
            id: this.id ? this.id : uuid(),
            isAccountHolder: false,
            verificationStatus: 'Please verify',
            altProfileText: (this.userDetailsToVerify.value?.firstName?.[0] ? this.userDetailsToVerify.value?.firstName?.[0]?.toUpperCase() : "") + (this.userDetailsToVerify.value?.lastName?.[0] ? this.userDetailsToVerify.value?.lastName?.[0]?.toUpperCase() : ""),
          },
          ...this.directors_List
        ]
        this.directors_List = directorList
        console.log('this.directors_List: ', this.directors_List);
      }
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.DIRECTORS_LIST,
        JSON.stringify(
          [...this.directors_List]
        )
      );
      this.router.navigate([
        'persons-of-control/confirm-directors',
      ]);
    } else if (this.userType == "2") {
      const index = this.shareholders_List?.findIndex((element: any) =>
        element?.id == this.id
      )
      console.log('index: ', index);
      if (index >= 0) {
        this.shareholders_List[index] = {
          ...this.userDetailsToVerify.value,
          id: this.id ? this.id : uuid(),
          isAccountHolder: false,
          verificationStatus: 'Please verify',
          altProfileText: (this.userDetailsToVerify.value?.firstName?.[0] ? this.userDetailsToVerify.value?.firstName?.[0]?.toUpperCase() : "") + (this.userDetailsToVerify.value?.lastName?.[0] ? this.userDetailsToVerify.value?.lastName?.[0]?.toUpperCase() : ""),
        }
      } else {
        const shareholders_List = [
          {
            ...this.userDetailsToVerify.value,
            id: this.id ? this.id : uuid(),
            isAccountHolder: false,
            verificationStatus: 'Please verify',
            altProfileText: (this.userDetailsToVerify.value?.firstName?.[0] ? this.userDetailsToVerify.value?.firstName?.[0]?.toUpperCase() : "") + (this.userDetailsToVerify.value?.lastName?.[0] ? this.userDetailsToVerify.value?.lastName?.[0]?.toUpperCase() : ""),
          },
          ...this.shareholders_List
        ]
        this.shareholders_List = shareholders_List
        console.log('this.directors_List: ', this.shareholders_List);
      }
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.SHAREHOLDERS_LIST,
        JSON.stringify(
          [...this.shareholders_List]
        )
      );
      this.router.navigate([
        'persons-of-control/confirm-shareholders',
      ]);
    }

  }
  private filterPostalCode(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.postalCode.toLowerCase().includes(filterValue)
    );
  }
  inputPostcode(value: string) {
    if (value) {
      const data = this.options.filter(
        (option: any) =>
          option.postalCode?.toLowerCase() == value?.toLowerCase()
      );
      if (data.length > 0) {
        this.userDetailsToVerify.patchValue({
          addressLine1: data[0].address_line_1,
          addressLine2: data[0].address_line_2,
          city: data[0].city,
        });
      } else {
        this.userDetailsToVerify.patchValue({
          addressLine1: '',
          addressLine2: '',
          city: '',
        });
      }
    } else {
      this.userDetailsToVerify.patchValue({
        address_line_1: '',
        address_line_2: '',
        city: '',
      });
    }
  }
  onPostalcodeSelectionChange(optionData: any) {
    if (optionData) {
      this.userDetailsToVerify.patchValue({
        addressLine1: optionData?.address_line_1,
        addressLine2: optionData?.address_line_2,
        city: optionData?.city,
      });
    } else {
      this.userDetailsToVerify.patchValue({
        addressLine1: '',
        addressLine2: '',
        city: '',
      });
    }
  }
}
