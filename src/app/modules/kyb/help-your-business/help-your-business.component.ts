import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-help-your-business',
  templateUrl: './help-your-business.component.html',
  styleUrls: ['./help-your-business.component.scss']
})
export class HelpYourBusinessComponent {
  helpYourBusinessForm: FormGroup;
  data: any
  oneTrue = false
  constructor(private fb: FormBuilder, private router: Router, private storageService: StorageService) {
    this.helpYourBusinessForm = this.fb.group({
      receivePayments: [false],
      makePurchases: [false],
      paySuppliers: [false],
      manageCurrencies: [false],
      toPaySalaries: [false],
      forExpenseManagement: [false],
    })
    this.setFormData()
  }
  ngOnInit() {
    this.isOneChecked()
  }

  isOneChecked() {
    const ifTrue = Object.keys(this.helpYourBusinessForm?.value).filter(key => this.helpYourBusinessForm?.value[key] == true)
    if (ifTrue?.length > 0) {
      this.oneTrue = true
    } else {
      this.oneTrue = false
    }
  }
  redirectToNextStep() {
    const kyb_object: any = {
      ...this.data,
      help_your_business: this.helpYourBusinessForm?.value,
      path: this.router.url,
    };
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.KYB_DATA, JSON.stringify(kyb_object))
    this.router.navigate(['/additional-information/supporting-documents'])
  }
  setFormData() {

    const temp: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.KYB_DATA)
    this.data = JSON.parse(temp)
    console.log('%c  formValues:', 'color: #0e93e0;background: #aaefe5;', this.data);
    if (this.data && this.data.help_your_business) {
      this.helpYourBusinessForm.patchValue(this.data.help_your_business)
    } else {
      this.helpYourBusinessForm = this.fb.group({
        receivePayments: false,
        makePurchases: false,
        paySuppliers: false,
        manageCurrencies: false,
        toPaySalaries: false,
        forExpenseManagement: false,
      })
    }


  }
}
