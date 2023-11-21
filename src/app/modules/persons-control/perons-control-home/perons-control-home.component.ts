import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-perons-control-home',
  templateUrl: './perons-control-home.component.html',
  styleUrls: ['./perons-control-home.component.scss'],
})
export class PeronsControlHomeComponent {
  directorsRedirection = '/persons-of-control/confirm-directors';
  sectionData: any[] = []
  directorsList: any[] = []
  business_details_data: any = {}
  storageData: any = {}
  person_of_control_data: any = {}
  isAutoFlow = false
  constructor(private storageService: StorageService, private route: Router) {
    this.get_business_details_data()
    this.Change_section_Data_Satus();
    this.get_person_of_control_data()
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

  get_person_of_control_data() {
    const person_of_control_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES)
    console.log('person_of_control_data: ', person_of_control_data);
    if (person_of_control_data) {
      this.person_of_control_data = JSON.parse(person_of_control_data) ? JSON.parse(person_of_control_data) : this.person_of_control_data;
    }
    const directorsList: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST)
    this.directorsList = JSON.parse(directorsList) ? JSON.parse(directorsList) : this.directorsList;
    console.log('this.directorsList: ', this.directorsList);
    // if (!(this.directorsList?.length > 0) && !this.isAutoFlow) {
    //   this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST, JSON.stringify(LISTOFUSERS))
    // }
    console.log('this.isAutoFlow: ', this.isAutoFlow);
    if (this.isAutoFlow) {
      this.directorsList = this.directorsList?.length > 0 ? this.directorsList : []
      console.log('this.directorsList: ', this.directorsList);
    } else {
      this.directorsList = this.directorsList?.length > 0 ? this.directorsList : LISTOFUSERS
      console.log('this.directorsList: ', this.directorsList);
    }
  }

  Change_section_Data_Satus() {
    const section_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.SECTIONS_DATA)
    if (section_data) {
      this.sectionData = JSON.parse(section_data) ? JSON.parse(section_data) : this.sectionData;
    }
    const index = this.sectionData.findIndex((data: any) => data?.text === "person_of_control")
    if (index >= 0) {
      this.sectionData[index].status = "In Progress";
      this.sectionData[index].icon = "minus-circle";
      this.sectionData[index].color = "warning";
    }
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.SECTIONS_DATA, JSON.stringify(this.sectionData))
  }
  _onSubmit() {
    if (this.person_of_control_data?.account_holder_flow) {
      this.route.navigate(['/persons-of-control/confirm-directors'])
    } else {
      this.route.navigate(['/persons-of-control/account-holder-details'])
    }
  }
}
