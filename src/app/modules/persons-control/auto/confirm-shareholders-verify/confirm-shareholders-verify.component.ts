import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { SHAREHOLDERS } from 'src/app/core/Services/common/person-of-control-stackholders';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doEncrypt } from 'src/app/utils/encryption';
@Component({
  selector: 'app-confirm-shareholders-verify',
  templateUrl: './confirm-shareholders-verify.component.html',
  styleUrls: ['./confirm-shareholders-verify.component.scss']
})
export class ConfirmShareholdersVerifyComponent {
  loggedInUser = 1;
  isAutoFlow = true;
  business_details_data: any = {};
  shareholderList: any = [];
  sectionData: any = {};
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
    if (this.shareholderList?.every((item: any) => item?.verificationStatus === this.VERIFIED_STATUS)) {
      const section_data: any = this.storageService.getFromLocalStorage(
        STORAGE_CONSTANTS.SECTIONS_DATA
      );
      if (section_data) {
        this.sectionData = JSON.parse(section_data)
          ? JSON.parse(section_data)
          : this.sectionData;
      }
      const index = this.sectionData.findIndex(
        (data: any) => data?.text === 'person_of_control'
      );
      if (index >= 0) {
        this.sectionData[index].status = 'Completed';
        this.sectionData[index].icon = 'checkmark-circle-2';
        this.sectionData[index].color = '#37AB87';
        this.sectionData[index].flag = false;
        this.sectionData[index + 1].flag = true;
        this.sectionData[index + 1].status = 'Click to Complete';
        this.sectionData[index + 1].icon = 'alert-triangle-outline';
        this.sectionData[index + 1].color = '#667085';
      }
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.SECTIONS_DATA,
        JSON.stringify(this.sectionData)
      );
      router.navigate(['/'])
    }
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
  _onVerify(user: any = null) {
    if (user) {
      if (this.loggedInUserDetails.verificationStatus != this.VERIFIED_STATUS) {
        this.router.navigate(
          ['/persons-of-control/confirm-identity'], {
          queryParams: {
            firstName: encodeURIComponent(_doEncrypt(user?.firstName ? user?.firstName : "")),
            lastName: encodeURIComponent(_doEncrypt(user?.lastName ? user?.lastName : "")),
          },
        }
        );
      }
    }
    // } else {
    //   this.router.navigate([
    //     `persons-of-control/confirm-identity/${encodeURIComponent(
    //       _doEncrypt(userId.toString())
    //     )}`,
    //   ]);
    // }
  }

  _onNext() {
    this.router.navigate([
      'persons-of-control/account-holder-verification-done',
    ]);
  }
  _onUpdateUserDetails(userId: any) {
    this.router.navigate([`/persons-of-control/add-user-details`], {
      queryParams: {
        userType: encodeURIComponent(_doEncrypt('2')),
        id: encodeURIComponent(_doEncrypt(userId?.toString())),
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
