import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmBusinessDetailsComponent } from './confirm-business-details/confirm-business-details.component';
import { FindYourCompanyComponent } from './find-your-company/find-your-company.component';
import { ConfirmTradingAddressComponent } from './confirm-trading-address/confirm-trading-address.component';
import { ManuallyTradingAddressComponent } from './manually-trading-address/manually-trading-address.component';

const routes: Routes = [
  {
    path: '',
    component: FindYourCompanyComponent
  },
  {
    path: 'confirm-business',
    component: ConfirmBusinessDetailsComponent
  },
  {
    path: 'confirm-trading',
    component: ConfirmTradingAddressComponent
  },
  {
    path: 'manual-trading',
    component: ManuallyTradingAddressComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessDetailsRoutingModule { }
