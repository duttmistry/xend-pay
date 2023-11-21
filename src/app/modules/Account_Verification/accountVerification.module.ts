import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountVerificationRoutingModule } from './account-verification-routing.module';
import { SelectAccountComponent } from './select-account/select-account.component';
import { NbAutocompleteModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconLibraries, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbThemeModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryRegistrationComponent } from './country-registration/country-registration.component';
import { TitleHeaderComponent } from 'src/app/core/components/title-header/title-header.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CreateAccountComponent } from './create-account/create-account.component';
import { VerificationComponent } from './verification/verification.component';
import { CoreModule } from 'src/app/core/core.module';
import { CodeInputModule } from 'angular-code-input';
import { VerificationMobileComponent } from './verification-mobile/verification-mobile.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [SelectAccountComponent, CountryRegistrationComponent, CreateAccountComponent, VerificationComponent, VerificationMobileComponent],
  imports: [CommonModule, AccountVerificationRoutingModule, ReactiveFormsModule, FormsModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbAutocompleteModule,
    NbCheckboxModule,
    NbBadgeModule,
    NbEvaIconsModule,
    NgSelectModule,
    CoreModule,
    CodeInputModule
  ]
})
export class AccountVerificationModule {
  constructor(private iconLibraries: NbIconLibraries) {
    // Register the Eva Icons pack with NbIconLibraries
    iconLibraries.registerSvgPack('eva', { iconClassPrefix: 'eva' });
  }
}
