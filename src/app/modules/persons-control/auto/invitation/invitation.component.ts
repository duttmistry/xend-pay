import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doDecrypt, _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent implements OnInit {
  email = '';
  id: any = ""
  userData: any = {}
  constructor(private router: Router, private activeRoute: ActivatedRoute, private activateRoute: ActivatedRoute, private storageService: StorageService) {
    const queryUserType = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['email'] || ''
    );
    this.email = _doDecrypt(queryUserType) ? _doDecrypt(queryUserType) : "";
    console.log('this.email: ', this.email);
    const queryUserId = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['id'] || ''
    );
    this.id = _doDecrypt(queryUserId) ? _doDecrypt(queryUserId) : "";
    console.log('this.id: ', this.id);
    const userData: any = {
      id: this.id,
      email: this.email,
    }
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.INDIVIDUALS_USER_FLOW,
      _doEncrypt(JSON.stringify(userData)
      ))

  }

  ngOnInit() {
    try {
      // const email = decodeURIComponent(
      //   this.activateRoute.snapshot.params['email'] || ''
      // );
      // const decEmail = _doDecrypt(email);
      // this.email = decEmail;
    } catch (error) {
      console.log(error);
    }
  }

  _backToMenu() {
    // this.router.navigate(['/persons-of-control/confirm-shareholders-verify']);
    this.router.navigate(['/persons-of-control/individual-verify-identity'], {
      queryParams: {
        id: encodeURIComponent(_doEncrypt(this.id.toString())),
      }
    });
  }
}
