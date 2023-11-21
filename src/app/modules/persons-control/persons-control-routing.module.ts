import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeronsControlHomeComponent } from './perons-control-home/perons-control-home.component';
import { PersonsControlAcountHolderDetailsComponent } from './persons-control-acount-holder-details/persons-control-acount-holder-details.component';
import { PersonsControlVerifyIdentityComponent } from './persons-control-verify-identity/persons-control-verify-identity.component';
import { PersonsControlProofOfAddressComponent } from './persons-control-proof-of-address/persons-control-proof-of-address.component';
import { PersonsControlProofOfIdentityComponent } from './persons-control-proof-of-identity/persons-control-proof-of-identity.component';
import { VerificationDoneComponent } from 'src/app/core/components/verification-done/verification-done.component';
import { ConfirmDirectorsComponent } from './auto/confirm-directors/confirm-directors.component';
import { ConfirmShareholdersComponent } from './auto/confirm-shareholders/confirm-shareholders.component';
import { VerifyUserIdentityComponent } from './auto/verify-user-identity/verify-user-identity.component';
import { InvitationComponent } from './auto/invitation/invitation.component';
import { VerifyIdentityComponent } from './auto/verify-identity/verify-identity.component';
import { VerifyProofOfAddressComponent } from './auto/verify-proof-of-address/verify-proof-of-address.component';
import { VerifyProofOfIdentityComponent } from './auto/verify-proof-of-identity/verify-proof-of-identity.component';
import { VerifyUserDetailsComponent } from './auto/verify-user-details/verify-user-details.component';
import { ConfirmShareholdersVerifyComponent } from './auto/confirm-shareholders-verify/confirm-shareholders-verify.component';
import { IndividualVerifyIdentityComponent } from './individual/individual-verify-identity/individual-verify-identity.component';
import { ConfirmDetailsComponent } from './individual/confirm-details/confirm-details.component';
import { IndividualProofOfAddressComponent } from './individual/individual-proof-of-address/individual-proof-of-address.component';
import { IndividualProofOfIdentityComponent } from './individual/individual-proof-of-identity/individual-proof-of-identity.component';
import { IndividualAllDoneComponent } from './individual/individual-all-done/individual-all-done.component';

const routes: Routes = [
  {
    path: '',
    component: PeronsControlHomeComponent,
  },
  {
    path: 'account-holder-details',
    component: PersonsControlAcountHolderDetailsComponent,
  },
  {
    path: 'account-holder-verify-identity',
    component: PersonsControlVerifyIdentityComponent,
  },
  {
    path: 'account-holder-verify-address-proof',
    component: PersonsControlProofOfAddressComponent,
  },
  {
    path: 'account-holder-verify-identity-proof',
    component: PersonsControlProofOfIdentityComponent,
  },
  {
    path: 'account-holder-verification-done',
    component: VerificationDoneComponent,
  },
  {
    path: 'confirm-directors',
    component: ConfirmDirectorsComponent,
  },
  {
    path: 'confirm-shareholders',
    component: ConfirmShareholdersComponent,
  },
  {
    path: 'confirm-shareholders-verify',
    component: ConfirmShareholdersVerifyComponent,
  },
  {
    path: 'confirm-identity',
    component: VerifyUserIdentityComponent,
  },
  {
    path: 'invitation',
    component: InvitationComponent,
  },
  {
    path: 'verify-user-identity/:id',
    component: VerifyIdentityComponent,
  },
  {
    path: 'verify-user-address-proof/:id',
    component: VerifyProofOfAddressComponent,
  },
  {
    path: 'verify-user-identity-proof/:id',
    component: VerifyProofOfIdentityComponent,
  },
  {
    path: 'verify-user-details/:id',
    component: VerifyUserDetailsComponent,
  },
  {
    path: 'add-user-details',
    component: VerifyUserDetailsComponent,
  },
  {
    path: 'individual-verify-identity',
    component: IndividualVerifyIdentityComponent,
  },
  {
    path: 'confirm-details',
    component: ConfirmDetailsComponent,
  },
  {
    path: 'individual-proof-of-address',
    component: IndividualProofOfAddressComponent,
  },
  {
    path: 'individual-proof-of-identity',
    component: IndividualProofOfIdentityComponent,
  },
  {
    path: 'individual-all-done',
    component: IndividualAllDoneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsControlRoutingModule { }
