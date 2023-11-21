import { AccountVerificationModule } from './modules/Account_Verification/accountVerification.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomethingWentWrongComponent } from './core/components/something-went-wrong/something-went-wrong.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/sections/sections.module').then(
        (m) => m.SectionsModule
      ),
  },
  {
    path: 'business-details',
    loadChildren: () =>
      import('./modules/business-details/business-details.module').then(
        (m) => m.BusinessDetailsModule
      ),
  },
  {
    path: 'account-verification',
    loadChildren: () =>
      import('./modules/Account_Verification/accountVerification.module').then(
        (m) => m.AccountVerificationModule
      ),
  },
  {
    path: 'persons-of-control',
    loadChildren: () =>
      import('./modules/persons-control/persons-control.module').then(
        (m) => m.PersonsControlModule
      ),
  },
  {
    path: 'additional-information',
    loadChildren: () =>
      import('./modules/kyb/kyb.module').then(
        (m) => m.KybModule
      ),
  },
  {
    path: 'page-not-found',
    component: SomethingWentWrongComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
