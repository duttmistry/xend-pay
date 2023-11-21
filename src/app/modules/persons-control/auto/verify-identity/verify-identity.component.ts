import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { _doDecrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.scss'],
})
export class VerifyIdentityComponent implements OnInit {
  //#region [Data Members]
  sections: any = [
    {
      name: 'Confirm your details',
      icon: 'doc.png',
      description: 'name, email address, home address',
      navigationUrl: '/persons-of-control/verify-user-details/',
    },
    {
      name: 'Proof of address',
      icon: 'bank.png',
      description: 'Bank statement, utility bills',
      navigationUrl: '/persons-of-control/verify-user-address-proof/',
    },
    {
      name: 'Proof of identity',
      icon: 'card.png',
      description: 'Passport, driving licence',
      navigationUrl: '/persons-of-control/verify-user-identity-proof/',
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
  listofDirectors = LISTOFUSERS;
  userDetails: any = null;
  //#endregion

  //#region [Member Functions]
  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    try {
      const id = decodeURIComponent(
        this.activeRoute.snapshot.params['id'] || ''
      );
      const decryptedId = _doDecrypt(id);
      this.userDetails = this.listofDirectors.find(
        (user: any) => user.id.toString() === decryptedId
      );
      this.sections.forEach((element: any) => {
        element.navigationUrl += this.activeRoute.snapshot.params['id'];
      });
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

  //#endregion
}
