import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent {
  data: any;
  dataArr: any
  fileDetails: any = [];
  // fileUploadFormControl: FormControl = new FormControl(
  //   null,
  //   Validators.required
  // );
  isAllUploaded = false;


  //#endregion

  //#region [Member Functions]
  constructor(private router: Router, private storageService: StorageService) {
    this.setFormData()

  }
  _OnfileUploadChange(eventArgs: any, id: any) {
    console.log('%c  eventArgs:', 'color: #0e93e0;background: #aaefe5;', eventArgs);
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
        this.dataArr.forEach((item: any) => {
          if (item.id == id) {
            item.fileName = file?.name
            item.status = 'Uploading'
            item.progressbar = 0
            setInterval(() => {
              if (item.progressbar != 100) {
                item.progressbar += 20;
              }
            }, 200);
            // console.log("Set timeout")
            setTimeout(() => {
              // console.log("Set timeout in")
              item.status = "Uploaded"
              item.icon = 'checkmark-circle-2'
              item.color = 'success'
              item.file = file
              item.progressbar = 0
              item.description = file?.name
              this.isAllUploaded = this.dataArr.every((item: any) => item.error === '' && item.status === 'Uploaded');
            }, 2000)
            // item.status = "Uploaded"
            // item.icon =  'checkmark-circle-2'
            // item.color = 'success'

          }
        })
        if (
          fileType.toLowerCase() === 'pdf' ||
          fileType.toLowerCase() === 'jpg' ||
          fileType.toLowerCase() === 'png'
        ) {
          // = file;
          this.dataArr.forEach((item: any) => {
            if (item.id == id) {
              item.fileName = file?.name
              item.status = 'Uploading'
              item.progressbar = 0
              // console.log("Set timeout")

              setTimeout(() => {
                // console.log("Set timeout in")
                item.status = "Uploaded"
                item.icon = 'checkmark-circle-2'
                item.color = 'success'
                item.file = file
                item.progressbar = 0
                item.description = file?.name
                this.isAllUploaded = this.dataArr.every((item: any) => item.error === '' && item.status === 'Uploaded');
                item.progressbar = 0
                const kyb_object: any = {
                  ...this.data,
                  document_upload: [
                    ...this.dataArr
                  ]
                }
                this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.KYB_DATA, JSON.stringify(kyb_object))
              }, 2000)
              setInterval(() => {
                if (item.progressbar != 100) {
                  item.progressbar += 20;
                }
              }, 200);
              //   item.fileName = file?.name
              //   item.status = "Uploaded"
              //   item.file = file
              //   item.icon =  'checkmark-circle-2'
              //   item.color = 'success'
              item.error = ''

            }
          })

        } else {
          
          this._removeSelectedFile(id);
          this.dataArr.forEach((item: any) => {
            if (item.id == id) {
              item.progressbar = 0
              item.fileName = file?.name
              item.status = 'Uploading'
              setInterval(() => {
                if (item.progressbar != 100) {
                  item.progressbar += 20;
                }
              }, 200);
              setTimeout(() => {
                item.error = 'Only file with type PDF,JPG and PNG is allowed.'
                item.fileName = ''
                item.status = "Upload failed."
                item.file = null
                item.icon = ''
                item.color = ''
                item.progressbar = 0
                item.description = 'Click to upload documents'

                this.isAllUploaded = this.dataArr.every((item: any) => item.error === '' && item.status === 'Uploaded');
              }, 2000)
            }
          })
          // this.errorMessage = 'Only file with type PDF,JPG and PNG is allowed.';
        }
        // console.log("this.dataArr",this.dataArr)
        // console.log("this.data",this.data)

      } else {
        this._removeSelectedFile(id);
      }
    } else {
      this._removeSelectedFile(id);
    }
  }
  // _previewFile() {
  //   if (this.fileDetails) {
  //     const objectUri = URL.createObjectURL(this.fileDetails);
  //     window.open(objectUri, '_blank');
  //   }
  // }
  _removeSelectedFile(id: any) {
    console.log("id", id)
    this.dataArr.forEach((item: any) => {
      if (item.id == id) {
        item.error = ''
        item.file = null;
        item.fileName = ''
        item.status = "Click to upload documents"
        item.icon = ''
        item.color = ''
        item.progressbar = 0
        item.description = 'Click to upload documents'
      }
    })
    const kyb_object: any = {
      ...this.data,
      document_upload: [
        ...this.dataArr
      ]
    }
    this.isAllUploaded = this.dataArr.every((item: any) => item.error === '' && item.status === 'Uploaded');
    console.log(this.dataArr)
    console.log("kyb_object", kyb_object)
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.KYB_DATA, JSON.stringify(kyb_object))
  }
  _onSubmit() {
    // console.log("this.dataArr",this.dataArr)
    this.router.navigate(['additional-information/supporting-documents']);
    // localStorage.setItem('addressProofUploaded', 'YES');
    // this.router.navigate(['persons-of-control/account-holder-verify-identity']);
  }
  setFormData() {
    const temp: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.KYB_DATA)
    this.data = JSON.parse(temp)
    if (this.data && (this.data?.document_upload || this.data?.document_upload?.length == 0)) {
      // console.log('%c  formValues:', 'color: #0e93e0;background: #aaefe5;', this.data);
      this.dataArr = this.data.document_upload
      this.isAllUploaded = this.dataArr.every((item: any) => item.error === '' && item.status === 'Uploaded');
      //  console.log('%c  this.dataArr:', 'color: #0e93e0;background: #aaefe5;', this.dataArr);
    } else {
      this.dataArr = [
        {
          id: 1,
          heading: "Add Document",
          description: "Additional documents for supporting your application",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
        {
          id: 2,
          heading: "Letter of good standing",
          description: "Click to upload documents",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
        {
          id: 3,
          heading: "Certificate of incorporation",
          description: "Click to upload documents",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
        {
          id: 4,
          heading: "Memorandum of association",
          description: "Click to upload documents",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
        {
          id: 5,
          heading: "Articles of association",
          description: "Click to upload documents",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
        {
          id: 6,
          heading: "Bank statement",
          description: "Click to upload documents",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
        {
          id: 7,
          heading: "Services based industry",
          description: "Click to upload documents",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
        {
          id: 8,
          heading: "VAT",
          description: "Click to upload documents",
          status: "Click to upload documents",
          icon: '',
          color: '',
          fileName: '',
          file: null,
          error: '',
          progressbar: 0
        },
      ]
    }


  }

}
// 