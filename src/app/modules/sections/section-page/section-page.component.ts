import { _doDecrypt, _doEncrypt } from './../../../utils/encryption';
import { Router } from '@angular/router';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss'],
})
export class SectionPageComponent {
  private dialogRef!: NbDialogRef<any>;
  @ViewChild('dialog')
  dialog!: TemplateRef<any>;
  activateAccountForm!: FormGroup;
  account_verification: any = {};
  business_detail: any = {};
  kybData: any = {};
  kybData_url = '/additional-information';
  account_verification_url = '/account-verification';
  business_details_url = '/business-details';
  disabled = true;
  dataArr: any = [
    {
      title: 'Account Verification',
      text: 'account_verification',
      description: 'We need to verify your account',
      id: 1,
      status: 'Click to Complete',
      icon: 'alert-triangle-outline',
      color: '#667085',
      flag: true,
    },
    {
      title: 'Business details',
      text: 'company_details',
      description:
        'Tell us how we can help, add business links and supporting documentation',
      id: 2,
      status: '',
      icon: '',
      color: '',
      flag: false,
    },
    {
      title: 'Person of control',
      text: 'person_of_control',
      description:
        'Account holder, directors and shareholders details and verification',
      id: 3,
      status: '',
      icon: '',
      color: '',
      flag: false,
      // status: 'In progress',
      // icon: 'minus-circle',
      // color: 'warning',
    },
    {
      title: 'Additional information',
      text: 'additional_information',

      description:
        'Tell us how we can help, add business links and supporting documentation',
      id: 4,
      status: '',
      icon: '',
      color: '',
      flag: false,
      // status: "Completed",
      // icon: "checkmark-circle-2",
      // color: "#37AB87"
    },
  ];

  total_sections = this.dataArr.length;
  completed_sections = this.dataArr.filter(
    (data: any) => data.status === 'Completed'
  ).length;
  title = 'Activate your account';
  subtitle_highlighted = `${this.completed_sections} / ${this.total_sections} sections  completed.`;
  subtitle_normal = 'You can comeback to complete it anytime.';
  constructor(private router: Router, private storageService: StorageService, private dialogService: NbDialogService) {
    const section_data: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.SECTIONS_DATA
    );
    if (!section_data) {
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.SECTIONS_DATA,
        JSON.stringify(this.dataArr)
      );
    } else {
      this.dataArr = JSON.parse(section_data)
        ? JSON.parse(section_data)
        : this.dataArr;
    }
    // const account_Object = {
    //     type_of_account: null,
    //     country_of_registraion: null,
    //     create_account: null,
    //     email_verification: null,
    //     mobile_verification: null,
    //   }
    // this.storageService.setIntoLocalStorage(
    //   STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES, JSON.stringify(account_Object)
    // )
    // const kyb_object = {
    //   about_your_business:null,
    //   help_your_business:null,
    //   supporting_documentation:null,
    //   document_upload:null,
    // }
    //   this.storageService.setIntoLocalStorage(
    //   STORAGE_CONSTANTS.KYB_DATA, JSON.stringify(kyb_object)
    // )

    this.get_Account_Verification_Data();
    this.get_Business_Details_Data();
    this.get_KYB_Data();
  }
  get_KYB_Data() {
    const phaseData: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.KYB_DATA
    );
    if (phaseData) {
      this.kybData = JSON.parse(phaseData)
        ? JSON.parse(phaseData)
        : this.kybData;
      if (this.kybData) {
        this.kybData_url = this.kybData?.path
          ? this.kybData?.path
          : this.kybData_url;
      }
    }
  }

  get_Account_Verification_Data() {
    const data: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.ACCOUNT_VERIFICATION_PAGES
    );
    if (data) {
      this.account_verification = JSON.parse(data)
        ? JSON.parse(data)
        : this.account_verification;
      if (this.account_verification) {
        this.account_verification_url = this.account_verification?.path
          ? this.account_verification?.path
          : this.account_verification_url;
      }
    }
  }

  get_Business_Details_Data() {
    const data: any =
      this.storageService.getFromLocalStorage('business_details');
    if (data) {
      this.business_detail = JSON.parse(data)
        ? JSON.parse(data)
        : this.business_detail;
      if (this.business_detail) {
        this.business_details_url = this.business_detail?.path
          ? this.business_detail?.path
          : this.business_details_url;
      }
    }
  }

  ngOnInit() {
    this.total_sections = this.dataArr.length;
    this.completed_sections = this.dataArr.filter(
      (data: any) => data.status === 'Completed'
    ).length;
    this.title =
      this.completed_sections == this.total_sections
        ? 'All done.'
        : (this.completed_sections == 0 ? 'Activate your account' : 'Complete all sections to activate account');
    // this.title =
    //   this.completed_sections > 0
    //     ? 'Complete all sections to activate account'
    //     : 'Activate your account';
    this.subtitle_highlighted = `${this.completed_sections} / ${this.total_sections} sections  completed.`;
  }

  accountRedirection(section: any) {
    // console.log('%c  section:', 'color: #0e93e0;background: #aaefe5;', section);
    if (section == 'account_verification') {
      this.router.navigate([this.account_verification_url]);
    }
    if (section == 'company_details') {
      this.getUrl(this.business_details_url);
    }
    if (section == 'person_of_control') {
      this.router.navigate(['/persons-of-control']);
    }
    if (section == 'additional_information') {
      this.router.navigate([this.kybData_url]);
    }
  }
  getUrl(url: any) {
    const splitted_url = url ? url?.split('?') : '';
    const params = this.getQueryParams(url);
    if (params && splitted_url?.length > 1) {
      this.router.navigate([splitted_url[0]], {
        queryParams: params,
      });
    } else {
      this.router.navigate([splitted_url[0]]);
    }
    console.log('splitted_url: ', splitted_url);
  }

  getQueryParams(url: any) {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params: any = {};
    paramArr.map((param: any) => {
      const [key, val]: any = param.split('=');
      params[key] = decodeURIComponent(val);
    });
    console.log('params: ', params);
    return params;
  }

  //Dialog

  protected openDialog() {
    const backdropClick = false
    this.dialogRef = this.dialogService.open(this.dialog, {
      closeOnBackdropClick: backdropClick
    });
  }
  ConfirmDialog() {
    var email = "test@cybercom.com";
    var subject = "Test";
    var msgBody = "Test";
    window.open(`mailto:${email}?subject=${subject}&body=${msgBody}`);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
