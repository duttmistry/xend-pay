import { StorageService } from './../../../core/Services/common/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { _doDecrypt, _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-confirm-trading-address',
  templateUrl: './confirm-trading-address.component.html',
  styleUrls: ['./confirm-trading-address.component.scss'],
})
export class ConfirmTradingAddressComponent implements OnInit {
  businessDetailsData: any = {};
  tradingAddressData: any = [];
  sectionData: any = [];
  storageData: any;
  is_same_address = false;
  constructor(private router: Router, private storageService: StorageService) {}
  ngOnInit() {
    try {
      const savedData = localStorage.getItem('business_details');
      console.log(savedData);
      if (savedData) {
        this.storageData = JSON.parse(savedData);
        this.businessDetailsData = this.storageData.companyDetails;
        if (this.storageData.sameAsCompanyAddress) {
          this.is_same_address = true;
          this.storageData.traddingAddress = [this.businessDetailsData];
          this.tradingAddressData = this.storageData.traddingAddress;
        } else {
          this.is_same_address = false;
          if (this.storageData.traddingAddress) {
            this.tradingAddressData = [...this.storageData.traddingAddress];
          } else {
            this.tradingAddressData = [];
          }
        }
      } else {
        this.router.navigate(['/business-details']);
      }
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/business-details']);
    }
    const section_data: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.SECTIONS_DATA
    );
    if (section_data) {
      this.sectionData = JSON.parse(section_data)
        ? JSON.parse(section_data)
        : this.sectionData;
    }
  }
  save_as_registerd_address() {
    this.is_same_address = true;
    this.storageData.sameAsCompanyAddress = true;
    this.storageData.traddingAddress = [this.businessDetailsData];
    localStorage.setItem('business_details', JSON.stringify(this.storageData));
    this.tradingAddressData = [this.businessDetailsData];
  }
  confirm_trading_address() {
    this.is_same_address = false;
    this.storageData.status = 3;
    this.storageData.path = this.router.url;
    localStorage.setItem('business_details', JSON.stringify(this.storageData));
    const index = this.sectionData.findIndex(
      (data: any) => data?.text === 'company_details'
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
    this.router.navigate(['/']);
  }
  manual_Trading_address() {
    this.storageData.sameAsCompanyAddress = false;
    localStorage.setItem('business_details', JSON.stringify(this.storageData));
    this.router.navigate(['/business-details/manual-trading']);
  }
}
