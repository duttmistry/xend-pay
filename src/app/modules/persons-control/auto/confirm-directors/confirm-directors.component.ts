import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-confirm-directors',
  templateUrl: './confirm-directors.component.html',
  styleUrls: ['./confirm-directors.component.scss'],
})
export class ConfirmDirectorsComponent {
  loggedInUser = 1;
  listofDirectors = LISTOFUSERS;
  person_of_control_data: any = {}
  business_details_data: any = {}
  directors_List: any = []
  isAutoFlow = true

  constructor(private router: Router, private storageService: StorageService) {
    this.get_business_details_data()
    this.get_person_of_control_data()
    const directors_List: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST)
    this.directors_List = JSON.parse(directors_List) ? JSON.parse(directors_List) : this.directors_List;
    console.log('this.directors_List: ', this.directors_List);
    console.log('this.isAutoFlow: ', this.isAutoFlow);
    if (this.isAutoFlow) {
      this.listofDirectors = this.directors_List?.length > 0 ? this.directors_List : []
      console.log('this.listofDirectors: ', this.listofDirectors);
    } else {
      this.listofDirectors = this.directors_List?.length > 0 ? this.directors_List : LISTOFUSERS
    }
  }

  get_person_of_control_data() {
    const person_of_control_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES)
    if (person_of_control_data) {
      this.person_of_control_data = JSON.parse(person_of_control_data) ? JSON.parse(person_of_control_data) : this.person_of_control_data;
      console.log('this.person_of_control_data: ', this.person_of_control_data);
      if (this.person_of_control_data?.account_holding_data) {
        const name = (this.person_of_control_data?.account_holding_data?.firstName ? this.person_of_control_data?.account_holding_data?.firstName : "") + " " + (this.person_of_control_data?.account_holding_data?.lastName ? this.person_of_control_data?.account_holding_data?.lastName : "")
        console.log('name: ', name);
        // const data = this.listofDirectors?.forEach((data: any) => (data?.name).toLowerCase() == name.toLowerCase())
        // console.log('data: ', data);
        // this.accountHolderDetails.patchValue(this.person_of_control_data?.account_holding_data)
      }
    }
  }
  // get_Account_Verification_Data() {
  //   const data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES)
  //   if (data) {
  //     this.get_Phase_Data = JSON.parse(data) ? JSON.parse(data) : this.get_Phase_Data;
  //     console.log('this.get_Phase_Data: ', this.get_Phase_Data);
  //     if (this.get_Phase_Data?.create_account) {
  //       this.accountHolderDetails.patchValue({
  //         firstName: this.get_Phase_Data?.create_account?.firstname ? (this.get_Phase_Data?.create_account?.firstname + " " + this.get_Phase_Data?.create_account?.middlename) : "",
  //         lastName: this.get_Phase_Data?.create_account?.lastname ? this.get_Phase_Data?.create_account?.lastname : "",
  //         mobilenumber: this.get_Phase_Data?.create_account?.mobilenumber ? this.get_Phase_Data?.create_account?.mobilenumber : "",
  //         countryLocation: this.get_Phase_Data?.create_account?.countryLocation ? this.get_Phase_Data?.create_account?.countryLocation : "",
  //         country: this.get_Phase_Data?.country_of_registraion ? this.get_Phase_Data?.country_of_registraion : "",
  //       })
  //     }
  //   }
  // }

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

  _onNext() {
    this.router.navigate(['/persons-of-control/confirm-shareholders']);
  }
  _onUpdateUserDetails(user: any) {
    this.router.navigate([`/persons-of-control/add-user-details`], {
      queryParams: {
        userType: encodeURIComponent(_doEncrypt('1')),
        firstName: encodeURIComponent(_doEncrypt(user?.firstName ? user?.firstName : "")),
        lastName: encodeURIComponent(_doEncrypt(user?.lastName ? user?.lastName : "")),
      },
    });
  }
  _onAddUser() {
    this.router.navigate([`/persons-of-control/add-user-details`], {
      queryParams: {
        userType: encodeURIComponent(_doEncrypt('1')),
      },
    });
  }
}
