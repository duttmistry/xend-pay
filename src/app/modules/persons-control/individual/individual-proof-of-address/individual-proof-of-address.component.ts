import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-individual-proof-of-address',
  templateUrl: './individual-proof-of-address.component.html',
  styleUrls: ['./individual-proof-of-address.component.scss']
})
export class IndividualProofOfAddressComponent {
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
  userFiles: any = null
  fileName = ''
  //#endregion

  //#region [Member Functions]
  constructor(private router: Router, private storageService: StorageService) {
    this.get_person_of_control_data()
  }

  get_person_of_control_data() {
    // const userFiles: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.INDIVIDUALS_USER_FILES)
    // if (userFiles) {
    //   this.userFiles = JSON.parse(userFiles) ? JSON.parse(userFiles) : this.userFiles;
    //   this.fileDetails = this.userFiles
    //   this.fileUploadFormControl.patchValue(this.userFiles)
    // }
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
      // this.storageService.setIntoLocalStorage(
      //   STORAGE_CONSTANTS.INDIVIDUALS_USER_FILES,
      //   JSON.stringify(this.fileDetails)
      // )
    }
    // localStorage.setItem('addressProofUploaded', 'YES');
    this.router.navigate([
      'persons-of-control/individual-proof-of-identity',
    ]);
  }
  //#endregion
}
