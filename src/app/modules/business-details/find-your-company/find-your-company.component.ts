import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { findCompanyArr } from 'src/app/core/Services/common/findCompanyData';
import { _doEncrypt } from 'src/app/utils/encryption';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';

@Component({
  selector: 'app-find-your-company',
  templateUrl: './find-your-company.component.html',
  styleUrls: ['./find-your-company.component.scss'],
})
export class FindYourCompanyComponent implements OnInit {
  storageData: any;
  findCompanyForm!: FormGroup;
  countryForm!: FormGroup;
  cantFindResult = false;
  allCompanyData = findCompanyArr;
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
  findCompanyFilteredArr: any[] = [];
  sectionData: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    this.initializeSearchForm();
    this.Change_section_Data_Satus();
  }

  ngOnInit(): void {
    try {
      const savedData = localStorage.getItem('business_details');
      console.log(savedData);
      if (savedData) {
        this.storageData = JSON.parse(savedData);
        if (this.storageData.isAuto) {
          this.countryForm.patchValue(this.storageData.selectedCountry);
          this.changeCountry();
          // this.findCompanyForm.patchValue(this.storageData.selectedCompany);
        }
      } else {
        this.storageData = {
          status: 1,
          isAuto: null,
          selectedCountry: null,
          selectedCompany: null,
          companyDetails: null,
          sameAsCompanyAddress: false,
          traddingAddress: null,
        };
        localStorage.setItem(
          'business_details',
          JSON.stringify(this.storageData)
        );
      }
    } catch {
      this.storageData = {
        status: 1,
        isAuto: null,
        selectedCountry: null,
        selectedCompany: null,
        companyDetails: null,
        sameAsCompanyAddress: false,
        traddingAddress: null,
      };
      localStorage.setItem(
        'business_details',
        JSON.stringify(this.storageData)
      );
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
      (data: any) => data?.text === 'company_details'
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
    this.findCompanyForm = this.formBuilder.group({
      selected_company: ['', [Validators.required]],
    });
    this.countryForm = this.formBuilder.group({
      countryLocation: ['India', Validators.required],
      search: [''],
    });
    const searchResults = this.allCompanyData?.filter((company: any) => {
      return company.country === this.countryForm?.value?.countryLocation;
    });
    // this.findCompanyFilteredArr = searchResults;
    this.findCompanyFilteredArr = [];
  }

  filterCompany(event: any) {
    if (event != '') {
      this.findCompanyForm.setValue({ selected_company: '' });
      if (this.countryForm.valid) {
        const searchResults = this.allCompanyData?.filter((company: any) => {
          const title = company.title.toLowerCase();
          const address = company.address.toLowerCase();
          const searchTerm = event.toLowerCase();

          return (
            (title.includes(searchTerm) || address.includes(searchTerm)) &&
            company.country === this.countryForm?.value?.countryLocation
          );
        });
        this.findCompanyFilteredArr = searchResults;
        this.cantFindResult = true;
        if (searchResults?.length == 0) {
          this.findCompanyForm.setValue({ selected_company: '' });
        }
      }
    } else {
      // this.findCompanyFilteredArr = this.allCompanyData?.filter(
      //   (company: any) => {
      //     return company.country === this.countryForm?.value?.countryLocation;
      //   }
      // );
      this.findCompanyFilteredArr = [];
      if (this.findCompanyFilteredArr?.length == 0) {
        this.findCompanyForm.setValue({ selected_company: '' });
        this.cantFindResult = true;
      }
      this.cantFindResult = false;
    }
  }
  save_Company() {
    if (this.findCompanyForm.valid) {
      console.log(this.findCompanyForm.value);
      const encrypted = encodeURIComponent(
        _doEncrypt(this.findCompanyForm?.value?.selected_company)
      );
      this.storageData.isAuto = true;
      this.storageData.selectedCompany = this.findCompanyForm?.value;
      this.storageData.selectedCountry = this.countryForm?.value;
      this.storageData.status = 2;
      this.storageData.path = this.router.url;
      localStorage.setItem(
        'business_details',
        JSON.stringify(this.storageData)
      );

      this.router.navigate(['/business-details/confirm-business'], {
        queryParams: { id: encrypted },
      });
    }
  }
  enter_Manual_Company() {
    this.findCompanyForm.setValue({ selected_company: '' });
    this.storageData.isAuto = false;
    this.storageData.selectedCountry = null;
    this.storageData.companyDetails = null;
    this.storageData.status = 2;
    localStorage.setItem('business_details', JSON.stringify(this.storageData));
    this.router.navigate([`/business-details/confirm-business`]);
  }
  changeCountry() {
    const searchResults = this.allCompanyData?.filter((company: any) => {
      return company.country === this.countryForm?.value?.countryLocation;
    });
    // this.findCompanyFilteredArr = searchResults;
    this.findCompanyFilteredArr = [];
    this.cantFindResult = false;
    this.countryForm.setValue({
      countryLocation: this.countryForm?.value?.countryLocation,
      search: '',
    });
    this.findCompanyForm.setValue({ selected_company: '' });
    this.storageData.companyDetails = null;
    this.storageData.sameAsCompanyAddress = false;
    this.storageData.traddingAddress = null;
  }
}
