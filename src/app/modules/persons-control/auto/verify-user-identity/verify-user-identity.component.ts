import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { SHAREHOLDERS } from 'src/app/core/Services/common/person-of-control-stackholders';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doDecrypt, _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-verify-user-identity',
  templateUrl: './verify-user-identity.component.html',
  styleUrls: ['./verify-user-identity.component.scss'],
})
export class VerifyUserIdentityComponent implements OnInit {
  listofDirectors = LISTOFUSERS;
  userDetails: any = null;
  filteredOptions$: Observable<any[]>;

  @ViewChild('autoInput') input: any;
  flag_Icon = '';
  countries: any[];
  shareholderList: any = [];
  id: any
  firstName: any = "Laura"
  lastName: any = "Holand"
  title = `Verify ${this.firstName} ${this.lastName} identity`
  identtifyVerficationform: FormGroup = new FormGroup({
    mobilenumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    countryLocation: new FormControl('+91', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private activeRoute: ActivatedRoute, private router: Router, private storageService: StorageService) {
    const firstName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['firstName'] || ''
    );
    this.firstName = firstName ? _doDecrypt(firstName) : "";
    console.log('this.firstName: ', this.firstName);
    const lastName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['lastName'] || ''
    );
    this.lastName = lastName ? _doDecrypt(lastName) : "";
    this.title = `Verify ${this.firstName} ${this.lastName} identity`
    const shareholderList: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.SHAREHOLDERS_LIST)
    this.shareholderList = JSON.parse(shareholderList) ? JSON.parse(shareholderList) : SHAREHOLDERS;
    console.log('this.shareholderList: ', this.shareholderList);
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
  }

  get identtifyVerficationformDetails() {
    return this.identtifyVerficationform.controls;
  }

  ngOnInit(): void {
    try {
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/persons-of-control/confirm-shareholders']);
    }
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
    if (this.identtifyVerficationform.valid) {
      this.shareholderList?.map((element: any) => {
        if (element?.firstName == this.firstName && element?.lastName == this.lastName) {
          element.verificationStatus = "Verified"
          this.id = element?.id
        }
      })
      this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.SHAREHOLDERS_LIST, JSON.stringify(
        this.shareholderList
      ))

      this.router.navigate(['/persons-of-control/invitation'], {
        queryParams: {
          id: encodeURIComponent(_doEncrypt(this.id.toString())),
          email: encodeURIComponent(_doEncrypt(this.identtifyVerficationformDetails['email'].value))
        },
      });
      // this.router.navigate([
      //   `/persons-of-control/invitation/${encodeURIComponent(
      //     _doEncrypt(this.identtifyVerficationformDetails['email'].value)
      //   )}`,
      // ]);
    }
  }
}
