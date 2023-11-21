import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectAccountComponent } from './select-account/select-account.component';
import { CountryRegistrationComponent } from './country-registration/country-registration.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { VerificationComponent } from './verification/verification.component';
import { VerificationMobileComponent } from './verification-mobile/verification-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: SelectAccountComponent,
  },
  {
    path: 'country-registration',
    component: CountryRegistrationComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: 'verification',
    component: VerificationComponent,
  },
  {
    path: 'verification-mobile',
    component: VerificationMobileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountVerificationRoutingModule { }
