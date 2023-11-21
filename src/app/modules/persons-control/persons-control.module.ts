import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconLibraries,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbThemeModule,
  NbDatepickerModule,
  NbProgressBarModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TitleHeaderComponent } from 'src/app/core/components/title-header/title-header.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { CoreModule } from 'src/app/core/core.module';
import { CodeInputModule } from 'angular-code-input';
import { NgSelectModule } from '@ng-select/ng-select';
import { PersonsControlRoutingModule } from './persons-control-routing.module';
import { PeronsControlHomeComponent } from './perons-control-home/perons-control-home.component';
import { PersonsControlAcountHolderDetailsComponent } from './persons-control-acount-holder-details/persons-control-acount-holder-details.component';
import { NbMomentDateModule } from '@nebular/moment';
import { PersonsControlVerifyIdentityComponent } from './persons-control-verify-identity/persons-control-verify-identity.component';
import { PersonsControlProofOfAddressComponent } from './persons-control-proof-of-address/persons-control-proof-of-address.component';
import { PersonsControlProofOfIdentityComponent } from './persons-control-proof-of-identity/persons-control-proof-of-identity.component';
import { ConfirmDirectorsComponent } from './auto/confirm-directors/confirm-directors.component';
import { ConfirmShareholdersComponent } from './auto/confirm-shareholders/confirm-shareholders.component';
import { DirectorsComponent } from './manual/directors/directors.component';
import { VerifyUserIdentityComponent } from './auto/verify-user-identity/verify-user-identity.component';
import { InvitationComponent } from './auto/invitation/invitation.component';
import { VerifyIdentityComponent } from './auto/verify-identity/verify-identity.component';
import { VerifyUserDetailsComponent } from './auto/verify-user-details/verify-user-details.component';
import { VerifyProofOfAddressComponent } from './auto/verify-proof-of-address/verify-proof-of-address.component';
import { VerifyProofOfIdentityComponent } from './auto/verify-proof-of-identity/verify-proof-of-identity.component';
import { ConfirmShareholdersVerifyComponent } from './auto/confirm-shareholders-verify/confirm-shareholders-verify.component';
import { IndividualVerifyIdentityComponent } from './individual/individual-verify-identity/individual-verify-identity.component';
import { ConfirmDetailsComponent } from './individual/confirm-details/confirm-details.component';
import { IndividualProofOfAddressComponent } from './individual/individual-proof-of-address/individual-proof-of-address.component';
import { IndividualProofOfIdentityComponent } from './individual/individual-proof-of-identity/individual-proof-of-identity.component';
import { IndividualAllDoneComponent } from './individual/individual-all-done/individual-all-done.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    PeronsControlHomeComponent,
    PersonsControlAcountHolderDetailsComponent,
    PersonsControlVerifyIdentityComponent,
    PersonsControlProofOfAddressComponent,
    PersonsControlProofOfIdentityComponent,
    ConfirmDirectorsComponent,
    ConfirmShareholdersComponent,
    DirectorsComponent,
    VerifyUserIdentityComponent,
    InvitationComponent,
    VerifyIdentityComponent,
    VerifyUserDetailsComponent,
    VerifyProofOfAddressComponent,
    VerifyProofOfIdentityComponent,
    ConfirmShareholdersVerifyComponent,
    IndividualVerifyIdentityComponent,
    ConfirmDetailsComponent,
    IndividualProofOfAddressComponent,
    IndividualProofOfIdentityComponent,
    IndividualAllDoneComponent,
  ],
  imports: [
    CommonModule,
    PersonsControlRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    CodeInputModule,
    NbCardModule,
    NbEvaIconsModule,
    NbInputModule,
    NbFormFieldModule,
    NbDatepickerModule,
    NbMomentDateModule,
    NbIconModule,
    NbCheckboxModule,
    NbSelectModule,
    NbAutocompleteModule,
    NgSelectModule,
    NbProgressBarModule,
    CalendarModule,
  ],
})
export class PersonsControlModule {
  constructor(private iconLibraries: NbIconLibraries) {
    // Register the Eva Icons pack with NbIconLibraries
    iconLibraries.registerSvgPack('eva', { iconClassPrefix: 'eva' });
  }
}
