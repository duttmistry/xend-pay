import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessDetailsRoutingModule } from './business-details-routing.module';
import { FindYourCompanyComponent } from './find-your-company/find-your-company.component';
import { ConfirmBusinessDetailsComponent } from './confirm-business-details/confirm-business-details.component';
import { ConfirmTradingAddressComponent } from './confirm-trading-address/confirm-trading-address.component';
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbCheckboxModule, NbBadgeModule, NbDatepickerModule } from '@nebular/theme';
import { CoreModule } from 'src/app/core/core.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManuallyTradingAddressComponent } from './manually-trading-address/manually-trading-address.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    FindYourCompanyComponent,
    ConfirmBusinessDetailsComponent,
    ConfirmTradingAddressComponent,
    ManuallyTradingAddressComponent,
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    CalendarModule,
    NbFormFieldModule,
    NbIconModule,
    NbAutocompleteModule,
    NbCheckboxModule,
    NbBadgeModule,
    NbEvaIconsModule,
    NgSelectModule,
    NbDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BusinessDetailsRoutingModule
  ],
})
export class BusinessDetailsModule { }
