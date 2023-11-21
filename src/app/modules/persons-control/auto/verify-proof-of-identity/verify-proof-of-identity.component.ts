import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { _doDecrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-verify-proof-of-identity',
  templateUrl: './verify-proof-of-identity.component.html',
  styleUrls: ['./verify-proof-of-identity.component.scss'],
})
export class VerifyProofOfIdentityComponent {
  userDetails: any = null;
  encUserId = '';
  listofDirectors = LISTOFUSERS;
  backPath = 'persons-of-control/verify-user-identity/';

  countries: any[] = [
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
    country: new FormControl<any>(null, Validators.required),
    docType: new FormControl('', Validators.required),
  });

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    try {
      this.encUserId = this.activeRoute.snapshot.params['id'] || '';
      this.backPath += this.encUserId;
      const id = decodeURIComponent(this.encUserId);
      const decryptedId = _doDecrypt(id);
      this.userDetails = this.listofDirectors.find(
        (user: any) => user.id.toString() === decryptedId
      );
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/persons-of-control/confirm-shareholders']);
    }
  }
  _onSubmit() {
    this.router.navigate([
      'persons-of-control/account-holder-verification-done',
    ]);
  }
  get identityFormDetails() {
    return this.identityForm.controls;
  }
}
