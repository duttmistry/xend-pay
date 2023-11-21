import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KybRoutingModule } from './kyb-routing.module';
import { AboutYourBusinessComponent } from './about-your-business/about-your-business.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbProgressBarModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { CodeInputModule } from 'angular-code-input';
import { HelpYourBusinessComponent } from './help-your-business/help-your-business.component';
import { SupportingDocumentsComponent } from './supporting-documents/supporting-documents.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { AllDoneComponent } from './all-done/all-done.component';



@NgModule({
  declarations: [
    AboutYourBusinessComponent,
    HelpYourBusinessComponent,
    SupportingDocumentsComponent,
    UploadDocumentComponent,
    AllDoneComponent
  ],
  imports: [
    CommonModule,
    KybRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
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
    CodeInputModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbProgressBarModule
  ]
})
export class KybModule { }
