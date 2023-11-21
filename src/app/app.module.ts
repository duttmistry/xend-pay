import { SectionsModule } from './modules/sections/sections.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconLibraries,
  NbInputModule,
  NbLayoutModule,
  NbSidebarModule,
  NbThemeModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CoreModule } from './core/core.module';
import { TitleHeaderComponent } from './core/components/title-header/title-header.component';
import { CodeInputModule } from 'angular-code-input';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    NbLayoutModule,
    CalendarModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbBadgeModule,
    NbEvaIconsModule,
    NbCheckboxModule,
    CodeInputModule,
    NgSelectModule,
    NbDatepickerModule.forRoot(),
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconLibraries: NbIconLibraries) {
    // Register the Eva Icons pack with NbIconLibraries
    iconLibraries.registerSvgPack('eva', { iconClassPrefix: 'eva' });
  }
}
