import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './screen/home/home.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ArrayComponent } from './screen/array/array.component';
import { RadioButtonComponent } from './shared/components/radio-button/radio-button.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { FundCardComponent } from './shared/components/fund-card/fund-card.component';
import { ModalHeaderComponent } from './shared/components/modal-header/modal-header.component';
import { Modal2Component } from './shared/components/modal2/modal2.component';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProgressBarComponent,
    ArrayComponent,
    RadioButtonComponent,
    ModalComponent,
    FundCardComponent,
    ModalHeaderComponent,
    Modal2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
