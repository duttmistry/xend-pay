import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, of, startWith } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { findCompanyArr } from 'src/app/core/Services/common/findCompanyData';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-manually-trading-address',
  templateUrl: './manually-trading-address.component.html',
  styleUrls: ['./manually-trading-address.component.scss'],
})
export class ManuallyTradingAddressComponent {
  id: any;
  businessDetailsForm!: FormGroup;
  countryData = [
    {
      id: 1,
      name: 'India',
    },
    {
      id: 2,
      name: 'U.S.',
    },
    {
      id: 3,
      name: 'Australia',
    },
    {
      id: 4,
      name: 'U.K.',
    },
    {
      id: 5,
      name: 'Russia',
    },
  ];

  options: any[];
  filteredControlOptions$: Observable<any[]>;
  filteredNgModelOptions$: Observable<any[]>;
  value: any;
  storageData: any;
  business_detail: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.initializeForm();
    this.options = [
      {
        postcode: 'KA3 1BD',
        address_line_1: '02018151 - Riverside House',
        address_line_2: 'River Street, Henley-On-Thames, Ox',
        city: 'Streamsville',
      },
      {
        postcode: 'KA5 1BD',
        address_line_1: '02018153 - Valley House',
        address_line_2: 'High Street, Oxford',
        city: 'Oxford',
      },
      {
        postcode: 'KD5 1BD',
        address_line_1: '020181662 - Chiltern House',
        address_line_2: 'Station Road, Henley-On-Thames, Ox',
        city: 'Henley-On-Thames',
      },
      {
        postcode: 'KE9 1BD',
        address_line_1: '123 Main Street',
        address_line_2: 'Springfield, IL',
        city: 'Springfield',
      },
    ];
    this.filteredControlOptions$ = of(this.options);
    this.filteredNgModelOptions$ = of(this.options);
    this.get_Business_Details_Data();
  }

  get_Business_Details_Data() {
    const data: any =
      this.storageService.getFromLocalStorage('business_details');
    if (data) {
      this.business_detail = JSON.parse(data)
        ? JSON.parse(data)
        : this.business_detail;
      if (this.business_detail?.traddingAddress?.length > 0) {
        this.businessDetailsForm.patchValue({
          country: this.business_detail?.traddingAddress[0]?.country
            ? this.business_detail?.traddingAddress[0]?.country
            : '',
          postcode: this.business_detail?.traddingAddress[0]?.postcode
            ? this.business_detail?.traddingAddress[0]?.postcode
            : '',
          address_line_1: this.business_detail?.traddingAddress[0]
            ?.address_line_1
            ? this.business_detail?.traddingAddress[0]?.address_line_1
            : '',
          address_line_2: this.business_detail?.traddingAddress[0]
            ?.address_line_2
            ? this.business_detail?.traddingAddress[0]?.address_line_2
            : '',
          city: this.business_detail?.traddingAddress[0]?.city
            ? this.business_detail?.traddingAddress[0]?.city
            : '',
        });
      }
    }
  }
  initializeForm() {
    this.businessDetailsForm = this.fb.group({
      country: ['', Validators.required],
      postcode: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.filteredControlOptions$ = this.businessDetailsForm.controls[
      'postcode'
    ].valueChanges.pipe(
      startWith(''),
      map((filterString) => this.filter(filterString))
    );
    try {
      const savedData = localStorage.getItem('business_details');
      console.log(savedData);
      if (savedData) {
        this.storageData = JSON.parse(savedData);
      } else {
        this.router.navigate(['/business-details']);
      }
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/business-details']);
    }
  }

  get _businessDetailsForm() {
    return this.businessDetailsForm.controls;
  }
  save_Company() {
    if (this.businessDetailsForm.valid) {
      this.router.navigate(['/business-details/confirm-trading']);
      console.log(this.businessDetailsForm.value);
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.TRADING_ADDRESS,
        _doEncrypt(JSON.stringify(this.businessDetailsForm.value))
      );
      this.storageData.sameAsCompanyAddress = false;
      this.storageData.traddingAddress = [this.businessDetailsForm.value];
      this.storageData.path = this.router.url;
      localStorage.setItem(
        'business_details',
        JSON.stringify(this.storageData)
      );
    } else if (this.businessDetailsForm.invalid) {
      this.businessDetailsForm.markAllAsTouched();
    }
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.postcode.toLowerCase().includes(filterValue)
    );
  }

  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }
  onSelectionChange(optionData: any) {
    if (optionData) {
      console.log('optionData: ', optionData);
      this.businessDetailsForm.patchValue({
        address_line_1: optionData?.address_line_1,
        address_line_2: optionData?.address_line_2,
        city: optionData?.city,
      });
    } else {
      this.businessDetailsForm.patchValue({
        address_line_1: '',
        address_line_2: '',
        city: '',
      });
    }
  }
  inputPostcode(value: string) {
    console.log('value: ', value);
    if (value) {
      const data = this.options.filter(
        (option: any) => option.postcode.toLowerCase() == value.toLowerCase()
      );
      if (data.length > 0) {
        this.businessDetailsForm.patchValue({
          address_line_1: data[0].address_line_1,
          address_line_2: data[0].address_line_2,
          city: data[0].city,
        });
      } else {
        this.businessDetailsForm.patchValue({
          address_line_1: '',
          address_line_2: '',
          city: '',
        });
      }
    } else {
      this.businessDetailsForm.patchValue({
        address_line_1: '',
        address_line_2: '',
        city: '',
      });
    }
  }
}
