import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, map, of, startWith } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { findCompanyArr } from 'src/app/core/Services/common/findCompanyData';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doDecrypt, _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-confirm-business-details',
  templateUrl: './confirm-business-details.component.html',
  styleUrls: ['./confirm-business-details.component.scss'],
})
export class ConfirmBusinessDetailsComponent {
  storageData: any;
  id: any = '';
  businessDetailsForm!: FormGroup;
  filteredControlOptions$: Observable<any[]>;
  filteredNgModelOptions$: Observable<any[]>;
  disabledAllFormField = false;
  filterFn = (date: any) => date < new Date();
  businessTypeData = [
    {
      id: 1,
      name: 'Sole Proprietorship',
    },
    {
      id: 2,
      name: 'Partnership',
    },
    {
      id: 3,
      name: 'Limited Liability Company',
    },
    {
      id: 4,
      name: 'Limited Liability Partnership',
    },
    {
      id: 5,
      name: 'Registered Company',
    },
  ];
  options: any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
  }

  ngOnInit() {
    this.filteredControlOptions$ = this.businessDetailsForm.controls[
      'postcode'
    ].valueChanges.pipe(
      startWith(''),
      map((filterString) => this.filter(filterString))
    );
    this.route.queryParams.subscribe((params: any) => {
      // console.log('params: ', params);
      const encrytedId = decodeURIComponent(params?.id);
      if (encrytedId) {
        this.id = _doDecrypt(encrytedId);
        // console.log('this.id: ', this.id);
      }
    });

    try {
      const savedData = localStorage.getItem('business_details');
      if (savedData) {
        this.storageData = JSON.parse(savedData);
        if (!this.storageData.isAuto) {
          if (this.storageData.companyDetails !== null) {
            console.log('this.storageData.companyDetails: ', this.storageData.companyDetails);
            this.businessDetailsForm.patchValue(
              this.storageData.companyDetails
            );
            this.checkDate(this.storageData?.companyDetails?.incorporate_activity)
          } else {
            this.businessDetailsForm.patchValue({
              company_name: '',
              company_number: '',
              business_type: '',
              postcode: '',
              address_line_1: '',
              address_line_2: '',
              city: '',
              business_activity: '',
              incorporate_activity: '',
            });
          }
        } else {
          this.id = this.storageData.selectedCompany?.selected_company;
          if (this.id == '') {
            this.businessDetailsForm.patchValue({
              company_name: '',
              company_number: '',
              business_type: '',
              postcode: '',
              address_line_1: '',
              address_line_2: '',
              city: '',
              business_activity: '',
              incorporate_activity: '',
            });
          } else {
            const companyArr = findCompanyArr;
            const selectedCompany = companyArr?.find(
              (company: any) => company?.id?.toString() == this.id?.toString()
            );
            if (selectedCompany) {
              this.businessDetailsForm.patchValue({
                company_name: selectedCompany?.company_name
                  ? selectedCompany?.company_name
                  : '',
                company_number: selectedCompany?.company_number
                  ? selectedCompany?.company_number
                  : '',
                business_type: selectedCompany?.business_type
                  ? this.getBusinessType(selectedCompany?.business_type)
                  : '',
                postcode: selectedCompany?.postcode
                  ? selectedCompany?.postcode
                  : '',
                address_line_1: selectedCompany?.address_line_1
                  ? selectedCompany?.address_line_1
                  : '',
                address_line_2: selectedCompany?.address_line_2
                  ? selectedCompany?.address_line_2
                  : '',
                city: selectedCompany?.city ? selectedCompany?.city : '',
                business_activity: selectedCompany?.business_activity
                  ? selectedCompany?.business_activity
                  : '',
                incorporate_activity: selectedCompany?.incorporate_activity
                  ? selectedCompany?.incorporate_activity
                  : '',
              });

              this.disabledAllFormField = true;
            }
          }
        }
      } else {
        this.router.navigate(['/business-details']);
      }
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/business-details']);
    }
  }
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.postcode.toLowerCase().includes(filterValue)
    );
  }
  checkDate(date: any) {
    if (date) {
      const dob = date ? moment(date).utc().format("MM/YYYY") : ''
      console.log('dob: ', dob);
      const data = this.checkDateFormat(date)
      console.log('data: ', data);
      if (data == "ISO") {
        this.businessDetailsForm.patchValue({
          incorporate_activity: dob,
        })
      } else if (data == "Custom") {
        this.businessDetailsForm.patchValue({
          incorporate_activity: date,
        })
      }
    }
  }
  checkDateFormat(dateString: string): string {
    const isoFormat = moment(dateString, moment.ISO_8601, true).isValid();
    const customFormat = moment(dateString, "MM/YYYY", true).isValid();

    if (isoFormat) {
      return "ISO";
    } else if (customFormat) {
      return "Custom";
    } else {
      return "Unknown";
    }
  }
  getBusinessType(type: any) {
    if (type) {
      return this.businessTypeData?.find((item: any) => item.name == type)?.id
        ? this.businessTypeData?.find((item: any) => item.name == type)?.id
        : '';
    }
    return '';
  }
  initializeForm() {
    if (this.id) {
      this.businessDetailsForm = this.fb.group({
        company_name: { value: '', disabled: true },
        company_number: { value: '', disabled: true },
        business_type: { value: '', disabled: true },
        postcode: { value: '', disabled: true },
        address_line_1: { value: '', disabled: true },
        address_line_2: { value: '', disabled: true },
        city: { value: '', disabled: true },
      });
    } else {
      this.businessDetailsForm = this.fb.group({
        company_name: ['', Validators.required],
        company_number: ['', Validators.required],
        business_type: ['', Validators.required],
        postcode: ['', Validators.required],
        address_line_1: ['', Validators.required],
        address_line_2: ['', Validators.required],
        city: ['', Validators.required],
        business_activity: ['', Validators.required],
        incorporate_activity: ['', Validators.required],
      });
    }
  }

  get _businessDetailsForm() {
    return this.businessDetailsForm.controls;
  }
  save_Company() {
    if (this.businessDetailsForm.valid) {
      this.router.navigate(['/business-details/confirm-trading']);
      console.log(this.businessDetailsForm.value);

      const {
        address_line_1,
        address_line_2,
        business_activity,
        business_type,
        city,
        company_name,
        company_number,
        incorporate_activity,
        postcode,
      } = this.businessDetailsForm.value;
      this.storageData.companyDetails = {
        address_line_1,
        address_line_2,
        business_activity,
        business_type,
        city,
        company_name,
        company_number,
        incorporate_activity,
        postcode,
      };
      this.storageData.path = this.router.url;
      localStorage.setItem(
        'business_details',
        JSON.stringify(this.storageData)
      );
    } else if (this.businessDetailsForm.invalid) {
      this.businessDetailsForm.markAllAsTouched();
    }
  }

  inputPostcode(value: string) {
    // console.log('value: ', value);
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
}
