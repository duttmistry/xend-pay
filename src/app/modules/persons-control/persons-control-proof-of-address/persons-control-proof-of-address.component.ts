import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-persons-control-proof-of-address',
  templateUrl: './persons-control-proof-of-address.component.html',
  styleUrls: ['./persons-control-proof-of-address.component.scss'],
})
export class PersonsControlProofOfAddressComponent {
  //#region [Data Members]
  fileDetails: any = null;
  fileUploadFormControl: FormControl = new FormControl(
    null,
    Validators.required
  );
  errorMessage = '';
  person_of_control_data: any = {}
  progressbar = 0;
  isUploading = false;
 fileName = ''
  //#endregion

  //#region [Member Functions]
  constructor(private router: Router, private storageService: StorageService) {
    this.get_person_of_control_data()
  }

  get_person_of_control_data() {
    const person_of_control_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES)
    if (person_of_control_data) {
      this.person_of_control_data = JSON.parse(person_of_control_data) ? JSON.parse(person_of_control_data) : this.person_of_control_data;
      if (this.person_of_control_data?.proof_of_address) {
        this.fileDetails = this.person_of_control_data?.proof_of_address?.fileDetails
        this.fileName = this.person_of_control_data?.proof_of_address?.fileName
        console.log('%c  this.fileDetails:', 'color: #0e93e0;background: #aaefe5;', this.fileDetails);
        this.fileUploadFormControl.patchValue(this.person_of_control_data?.proof_of_address)
      }
    }
  }
  _OnfileUploadChange(eventArgs: any) {
    if (eventArgs) {
      const file = eventArgs?.target?.files
        ? eventArgs?.target?.files[0]
        : null;
      if (file) {
        const fileNameparts = file?.name?.split('.') || [];
        const fileType =
          fileNameparts && fileNameparts.length > 0
            ? fileNameparts[fileNameparts.length - 1]
            : '';

        if (
          fileType.toLowerCase() === 'pdf' ||
          fileType.toLowerCase() === 'jpg' ||
          fileType.toLowerCase() === 'png'
        ) {
          this.isUploading = true;
          this.progressbar = 0;
          setInterval(() => {
            if (this.progressbar != 100) {
              this.progressbar += 20;
            }
          }, 200);
          setTimeout(() => {
            this.fileName = file?.name
            this.fileDetails = file;
            this.isUploading = false;
            this.fileUploadFormControl.patchValue(file)
          }, 2000)
          this.errorMessage = '';
        } else {
          this.fileDetails = null;
          this.progressbar = 0;
          this.isUploading = true;
          setInterval(() => {
            if (this.progressbar != 100) {
              this.progressbar += 20;
            }
          }, 200);
          setTimeout(() => {
            this.isUploading = false;
            this._removeSelectedFile();
            this.errorMessage = 'Only file with type PDF,JPG and PNG is allowed.';
          }, 2000)
        }
      } else {
        this._removeSelectedFile();
      }
    } else {
      this._removeSelectedFile();
    }
  }
  _previewFile() {
    if (this.fileDetails) {
      const objectUri = URL.createObjectURL(this.fileDetails);
      window.open(objectUri, '_blank');
    }
  }
  _removeSelectedFile() {
    this.errorMessage = '';
    this.fileDetails = null;
    this.fileUploadFormControl.patchValue(null);
  }
  _onSubmit() {
    if (this.fileDetails) {
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES,
        JSON.stringify({
          ...this.person_of_control_data,
          proof_of_address: {fileDetails:this.fileDetails,fileName:this.fileName},
        })
      )
    }
    localStorage.setItem('addressProofUploaded', 'YES');
    this.router.navigate([
      'persons-of-control/account-holder-verify-identity-proof',
    ]);
  }
  //#endregion
}
