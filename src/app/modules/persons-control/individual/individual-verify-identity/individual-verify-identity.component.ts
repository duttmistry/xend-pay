import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { _doDecrypt, _doEncrypt } from 'src/app/utils/encryption';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';

@Component({
  selector: 'app-individual-verify-identity',
  templateUrl: './individual-verify-identity.component.html',
  styleUrls: ['./individual-verify-identity.component.scss']
})
export class IndividualVerifyIdentityComponent {
  id: any = ""
  userData: any = {}
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
  constructor(private activeRoute: ActivatedRoute, private router: Router, private storageService: StorageService) {
    const queryUserId = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['id'] || ''
    );
    this.id = _doDecrypt(queryUserId) ? _doDecrypt(queryUserId) : "";
    console.log('this.id: ', this.id);
    const userData: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.INDIVIDUALS_USER_FLOW)
    if (userData) {
      this.userData = _doDecrypt(userData) ? JSON.parse(_doDecrypt(userData)) : this.userData;
      console.log('this.userData: ', this.userData);
      if (!this.id) {
        this.id = this.userData?.id
      }
    }
  }

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
      'persons-of-control/confirm-details'], {
      queryParams: {
        id: encodeURIComponent(_doEncrypt(this.id.toString())),
      }
    }
    );
  }
}
