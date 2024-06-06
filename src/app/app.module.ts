import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WcsAngularModule } from 'wcs-angular';
import { FormlyModule } from '@ngx-formly/core';
import { WcsFormlyModule } from 'wcs-formly';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { InputOutputComponent } from './pages/input-output/input-output.component';
import { NetworkingComponent } from './pages/networking/networking.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    InputOutputComponent,
    NetworkingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WcsAngularModule,
    FormlyModule.forRoot(),
    WcsFormlyModule,
    ReactiveFormsModule,
	  HttpClientModule,
	  ToastrModule.forRoot({
		  progressBar: true,
		  autoDismiss: true,
		  closeButton: true,
		  positionClass: 'toast-bottom-right',
		  timeOut: 7000
	  }),
	  BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
