import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { SHAREHOLDERS } from 'src/app/core/Services/common/person-of-control-stackholders';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-confirm-shareholders',
  templateUrl: './confirm-shareholders.component.html',
  styleUrls: ['./confirm-shareholders.component.scss'],
})
export class ConfirmShareholdersComponent {
  loggedInUser = 1;
  isAutoFlow = true;
  business_details_data: any = {};
  shareholderList: any = [];
  loggedInUserDetails = {
    profilePic: null,
    name: 'Laura Hollend',
    altProfileText: 'LH',
    id: 1,
    verificationStatus: 'Please verify',
  };
  VERIFIED_STATUS = 'Verified';
  listofDirectors = LISTOFUSERS;
  allAreVerified = false;

  constructor(private router: Router, private storageService: StorageService) {
    this.get_business_details_data()
    const shareholderList: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.SHAREHOLDERS_LIST)
    this.shareholderList = JSON.parse(shareholderList) ? JSON.parse(shareholderList) : SHAREHOLDERS;
    console.log('this.shareholderList: ', this.shareholderList);
  }

  get_business_details_data() {
    const data: any = localStorage.getItem('business_details')
    if (data) {
      this.business_details_data = JSON.parse(data) ? JSON.parse(data) : this.business_details_data;
      console.log('this.business_details_data: ', this.business_details_data);
      if (this.business_details_data?.isAuto) {
        this.isAutoFlow = false
        // this.accountHolderDetails.patchValue({
        //   addressLine1: this.business_details_data?.companyDetails?.address_line_1 ? this.business_details_data?.companyDetails?.address_line_1 : "",
        //   addressLine2: this.business_details_data?.companyDetails?.address_line_2 ? this.business_details_data?.companyDetails?.address_line_2 : "",
        //   city: this.business_details_data?.companyDetails?.city ? this.business_details_data?.companyDetails?.city : "",
        // })
      } else {
        this.isAutoFlow = true
      }
    }
  }

  getColorFromStatus(status: any) {
    switch (status) {
      case 'Please verify':
        return '#eaa6a6';
      case 'Verified':
        return '#00800047';

      default:
        return '#ffff';
    }
  }
  _onVerify(userId: any = null) {
    if (!userId) {
      if (this.loggedInUserDetails.verificationStatus != this.VERIFIED_STATUS) {
        this.router.navigate([
          `persons-of-control/confirm-identity/${encodeURIComponent(
            _doEncrypt(this.loggedInUser.toString())
          )}`,
        ]);
      }
    } else {
      this.router.navigate([
        `persons-of-control/confirm-identity/${encodeURIComponent(
          _doEncrypt(userId.toString())
        )}`,
      ]);
    }
  }

  _onNext() {
    this.router.navigate([
      'persons-of-control/confirm-shareholders-verify',
    ]);
  }
  _onUpdateUserDetails(user: any) {
    this.router.navigate([`/persons-of-control/add-user-details`], {
      queryParams: {
        userType: encodeURIComponent(_doEncrypt('2')),
        firstName: encodeURIComponent(_doEncrypt(user?.firstName ? user?.firstName : "")),
        lastName: encodeURIComponent(_doEncrypt(user?.lastName ? user?.lastName : "")),
      },
    });
  }
  _onAddUser() {
    this.router.navigate([`/persons-of-control/add-user-details`], {
      queryParams: {
        userType: encodeURIComponent(_doEncrypt('2')),
      },
    });
  }
}
