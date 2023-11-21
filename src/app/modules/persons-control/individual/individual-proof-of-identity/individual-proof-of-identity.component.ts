import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { _doDecrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-individual-proof-of-identity',
  templateUrl: './individual-proof-of-identity.component.html',
  styleUrls: ['./individual-proof-of-identity.component.scss']
})
export class IndividualProofOfIdentityComponent {
  userDetails: any = null;
  encUserId = '';
  listofDirectors = LISTOFUSERS;
  backPath = 'persons-of-control/individual-proof-of-address';

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
    country: new FormControl<any>('India', Validators.required),
    docType: new FormControl('', Validators.required),
  });
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
      'persons-of-control/individual-all-done',
    ]);
  }
  get identityFormDetails() {
    return this.identityForm.controls;
  }
}
