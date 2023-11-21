import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, map, of } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-persons-control-proof-of-identity',
  templateUrl: './persons-control-proof-of-identity.component.html',
  styleUrls: ['./persons-control-proof-of-identity.component.scss'],
})
export class PersonsControlProofOfIdentityComponent {
  //#region [Data Members]
  // countries: any[] = [
  //   {
  //     country_code: '+91',
  //     flag: 'flag-icon-in flag-icon-squared',
  //     name: 'India',
  //     id: 1,
  //   },
  //   {
  //     country_code: '+1',
  //     flag: 'flag-icon-us flag-icon-squared',
  //     name: 'U.S.',
  //     id: 2,
  //   },
  //   {
  //     country_code: '+61',
  //     flag: 'flag-icon-au flag-icon-squared',
  //     name: 'Australia',
  //     id: 3,
  //   },
  // ];
  countries = [
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
  docsList = [
    {
      key: 'Driving Licence',
      value: 'Driving Licence',
    },
    {
      key: 'Passport',
      value: 'Passport',
    },
  ];
  idTypes: any = [];
  identityForm: FormGroup = new FormGroup({
    country: new FormControl<any>('India', Validators.required),
    docType: new FormControl('', Validators.required),
  });
  person_of_control_data: any = {}
  //#endregion

  constructor(private router: Router, private storageService: StorageService) {
    this.get_person_of_control_data()
  }

  get_person_of_control_data() {
    const person_of_control_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES)
    if (person_of_control_data) {
      this.person_of_control_data = JSON.parse(person_of_control_data) ? JSON.parse(person_of_control_data) : this.person_of_control_data;
      if (this.person_of_control_data?.verify_identity_proof) {
        this.identityForm.patchValue(this.person_of_control_data?.verify_identity_proof)
      }
    }
  }
  _onSubmit() {
    localStorage.setItem('proofOfidentityUploaded', 'YES');
    this.storageService.setIntoLocalStorage(
      STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES,
      JSON.stringify({
        ...this.person_of_control_data,
        verify_identity_proof: this.identityForm.value
      })
    )
    this.router.navigate([`/persons-of-control/account-holder-verification-done`], {
      queryParams: {
        flow: encodeURIComponent(_doEncrypt('account_holder_flow')),
      },
    });
  }
  get identityFormDetails() {
    return this.identityForm.controls;
  }
}
