import {
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbBadgeModule,
  NbIconModule,
  NbDialogModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TitleHeaderComponent } from './components/title-header/title-header.component';
import { StorageService } from './Services/common/storage.service';
import { VerificationDoneComponent } from './components/verification-done/verification-done.component';
import { SomethingWentWrongComponent } from './components/something-went-wrong/something-went-wrong.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    TitleHeaderComponent,
    SidebarComponent,
    VerificationDoneComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, CoreRoutingModule, NbIconModule, NbButtonModule, DialogModule, NbDialogModule.forRoot(), NbCardModule],
  exports: [TitleHeaderComponent, SidebarComponent, VerificationDoneComponent, HeaderComponent],
})
export class CoreModule { }
