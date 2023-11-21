import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { _doDecrypt } from 'src/app/utils/encryption';
import { StorageService } from '../../Services/common/storage.service';
import { STORAGE_CONSTANTS } from '../../Services/common/constants';

@Component({
  selector: 'app-verification-done',
  templateUrl: './verification-done.component.html',
  styleUrls: ['./verification-done.component.scss'],
})
export class VerificationDoneComponent {
  flow: any = "";
  button = "Next";
  person_of_control_data: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private storageService: StorageService) {
    this.route.queryParams.subscribe((params: any) => {
      // console.log('params: ', params);
      const encrytedId = decodeURIComponent(params?.flow);
      if (encrytedId) {
        this.flow = _doDecrypt(encrytedId);
        console.log('this.flow: ', this.flow);
        if (this.flow == 'account_holder_flow') {
          this.button = "Done";
        }
      }
    });
    this.get_person_of_control_data()
  }

  get_person_of_control_data() {
    const person_of_control_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES)
    if (person_of_control_data) {
      this.person_of_control_data = JSON.parse(person_of_control_data) ? JSON.parse(person_of_control_data) : this.person_of_control_data;
    }
  }
  _onSubmit() {
    if (this.flow == 'account_holder_flow') {
      this.storageService.setIntoLocalStorage(
        STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES,
        JSON.stringify({
          ...this.person_of_control_data,
          account_holder_flow: true
        })
      )
      this.router.navigate(['/persons-of-control']);
    } else {
      this.router.navigate(['../']);
    }
  }
}
