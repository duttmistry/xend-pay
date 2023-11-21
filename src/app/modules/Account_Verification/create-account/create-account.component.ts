import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;
  get_Phase_Data: any = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    this.createAccountForm = this.fb.group({
      firstname: ['', [Validators.required]],
      middlename: [''], // Optional field
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      countryLocation: ['', Validators.required],
      termsandcoditions: [false, Validators.requiredTrue],
    });
    // this.options = ['India', 'U.S.', 'Australia'];
    this.options = [
      { country_code: '+91', flag: 'flag-icon-in flag-icon-squared' },
      { country_code: '+1', flag: 'flag-icon-us flag-icon-squared' },
      { country_code: '+61', flag: 'flag-icon-au flag-icon-squared' },
    ];

    this.filteredOptions$ = of(this.options);
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
      if (this.get_Phase_Data?.create_account) {
        this.createAccountForm.patchValue(this.get_Phase_Data?.create_account);
      } else {
        this.createAccountForm.patchValue({
          firstname: '',
          middlename: '',
          lastname: '',
          email: '',
          password: '',
          mobilenumber: '',
          countryLocation: '+91',
          termsandcoditions: false,
        });
      }
    }
  }

  ngOnInit() {
    // this.createAccountForm.setValue({
    //   firstname: '',
    //   middlename: '',
    //   lastname: '',
    //   email: '',
    //   password: '',
    //   mobilenumber: '',
    //   countryLocation: '+91',
    //   termsandcoditions: false
    // })
  }
  get formControls() {
    return this.createAccountForm.controls;
  }

  createAccount() {
    // console.log(this.createAccountForm.errors);
    // console.log('this.createAccountForm.valid: ', this.createAccountForm.valid);
    if (this.createAccountForm.valid) {
      console.log(this.createAccountForm.value);
      this.filteredOptions$.subscribe((res) => {
        console.log('res: ', res);
        // this.router.navigate(['/account-verification/verification'])
        this.router.navigate(['/account-verification/verification']);
      });
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES,
        JSON.stringify({
          ...this.get_Phase_Data,
          create_account: {
            ...this.createAccountForm.value,
            countryLocation: this.createAccountForm?.value?.countryLocation,
          },
          path: this.router.url,
        })
      );
    } else if (this.createAccountForm.invalid) {
      this.createAccountForm.markAllAsTouched();
    }
  }

  selectedItemNgModel: any;
  selectedItemFormControl = new FormControl();
  options: any[];
  filteredOptions$: Observable<any[]>;
  flag_Icon = '';
  @ViewChild('autoInput') input: any;

  // private filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  // }
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.flag_Icon = '';
    return this.options.filter((option) =>
      option.country_code.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<any[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
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
  checked_termsANdConditions(event: any) {
    console.log('event: ', event);

    this.createAccountForm.controls['termsandcoditions'].setValue(event);
    console.log('this.createAccountForm: ', this.createAccountForm.value);
  }
  // selectCountry() {
  //   if (this.createAccountForm.valid) {
  //     console.log(this.createAccountForm.value);
  //     this.filteredOptions$.subscribe(res => {
  //       console.log('res: ', res);
  //       this.router.navigate(['/account-verification/verification'])
  //     });
  //   } else if (this.createAccountForm.invalid) {
  //     this.createAccountForm.markAllAsTouched(); console.log("hfkjf");
  //   }
  // }
}
