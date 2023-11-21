import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutYourBusinessComponent } from './about-your-business/about-your-business.component';
import { HelpYourBusinessComponent } from './help-your-business/help-your-business.component';
import { SupportingDocumentsComponent } from './supporting-documents/supporting-documents.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { AllDoneComponent } from './all-done/all-done.component';

const routes: Routes = [
  {
    path: '',
    component: AboutYourBusinessComponent
  },
  {
    path: 'about-your-business',
    component: AboutYourBusinessComponent
  },
  {
    path: 'help-your-business',
    component: HelpYourBusinessComponent
  },
  {
    path: 'supporting-documents',
    component: SupportingDocumentsComponent
  },
  {
    path: 'upload-document',
    component: UploadDocumentComponent
  },
  {
    path: 'all-done',
    component: AllDoneComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KybRoutingModule { }
