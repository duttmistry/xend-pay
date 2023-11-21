import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.scss']
})
export class SupportingDocumentsComponent {
  supportingDocumentsForm: FormGroup;
  data: any
  isAllFileUploaded:any=false
  constructor(private fb: FormBuilder, private router: Router, private storageService: StorageService) {
    this.supportingDocumentsForm = this.fb.group({
      portFolio: ['']
    })
    this.setFormData()
  }
  ngOnInit() {
   
  }
  redirectToUpload(){
    this.router.navigate(['/additional-information/upload-document'])
  }
  redirectToNextStep() {
    const kyb_object: any = {
      ...this.data,
      supporting_documentation: this.supportingDocumentsForm?.value,
      path: this.router.url,
    };
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.KYB_DATA, JSON.stringify(kyb_object))
    this.isAllFileUploaded = this.data?.document_upload?.every((item:any) => item.error === '' && item.status === 'Uploaded');
    if(this.data && this.data.document_upload?.length > 0 && this.isAllFileUploaded){
      this.router.navigate(['/additional-information/all-done'])
      }
  }
  setFormData(){
    const temp:any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.KYB_DATA)
    this.data= JSON.parse(temp)
    // console.log('%c  formValues:', 'color: #0e93e0;background: #aaefe5;', this.data);
    this.isAllFileUploaded = this.data?.document_upload?.every((item:any) => item.error === '' && item.status === 'Uploaded');
    if(this.data && this.data?.help_your_business){
      this.supportingDocumentsForm.patchValue(this.data.supporting_documentation)
    }else{
      this.supportingDocumentsForm = this.fb.group({
        portFolio: ""
      })
    }
  

  }
}
