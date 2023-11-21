import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doDecrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-verify-proof-of-address',
  templateUrl: './verify-proof-of-address.component.html',
  styleUrls: ['./verify-proof-of-address.component.scss'],
})
export class VerifyProofOfAddressComponent {
  userDetails: any = null;
  encUserId = '';
  listofDirectors = LISTOFUSERS;
  backPath = 'persons-of-control/verify-user-identity/';
  fileDetails: any = null;
  fileUploadFormControl: FormControl = new FormControl(
    null,
    Validators.required
  );
  errorMessage = '';
  fileName = ''
  isUploading = false;
  progressbar = 0;
  constructor(private activeRoute: ActivatedRoute, private router: Router,private storageService: StorageService) {}

  ngOnInit(): void {
    try {
      this.fileName = localStorage.getItem('addressProofName') || ''
      this.encUserId = this.activeRoute.snapshot.params['id'] || '';
      this.backPath += this.encUserId;
      const id = decodeURIComponent(this.encUserId);
      const decryptedId = _doDecrypt(id);
      this.userDetails = this.listofDirectors.find(
        (user: any) => user.id.toString() === decryptedId
      );
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/persons-of-control/confirm-shareholders']);
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
    localStorage.setItem('addressProofUploaded', 'YES');
    localStorage.setItem('addressProofName', this.fileName);
    this.router.navigate([
      `/persons-of-control/verify-user-identity-proof/${this.encUserId}`,
    ]);
  }
 
}
