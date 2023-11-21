import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persons-control-verify-identity',
  templateUrl: './persons-control-verify-identity.component.html',
  styleUrls: ['./persons-control-verify-identity.component.scss'],
})
export class PersonsControlVerifyIdentityComponent implements OnInit {
  //#region [Data Members]
  sections: any = [
    {
      name: 'Proof of Address',
      icon: 'bank.png',
      description: 'Bank statement, utility bills',
      navigationUrl: '/persons-of-control/account-holder-verify-address-proof',
    },
    {
      name: 'Proof of identity',
      icon: 'identification.png',
      description: 'Passport, driving licence',
      navigationUrl: '/persons-of-control/account-holder-verify-identity-proof',
    },
    {
      name: 'Selfie',
      icon: 'camera.png',
      description: "To make sure that it's you",
      navigationUrl: '/persons-of-control/#',
    },
  ];
  addressProofUploaded: any = false;
  proofOfidentityUploaded: any = false;
  selfiUpdated: any = true;
  //#endregion

  //#region [Member Functions]
  constructor(private router: Router) { }
  ngOnInit() {
    this.addressProofUploaded =
      localStorage.getItem('addressProofUploaded')?.toUpperCase() === 'YES';
    this.proofOfidentityUploaded =
      localStorage.getItem('proofOfidentityUploaded')?.toUpperCase() === 'YES';
    // this.selfiUpdated = localStorage.getItem('selfiUpdated') === 'YES';
  }
  _onSubmit() {
    this.router.navigate([
      'persons-of-control/account-holder-verify-address-proof',
    ]);
  }

  //#endregion
}
