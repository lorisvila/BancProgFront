import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WcsAngularModule } from 'wcs-angular';
import { FormlyModule } from '@ngx-formly/core';
import { WcsFormlyModule } from 'wcs-formly';
import { InputOutputComponent } from './pages/input-output/input-output.component';
import { NetworkingComponent } from './pages/networking/networking.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RetrovisionComponent } from './pages/retrovision/retrovision.component';
import { VideoprotectionComponent } from './pages/videoprotection/videoprotection.component';
import { RefreshButtonComponent } from './components/refresh-button/refresh-button.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SyncButtonComponent } from './components/sync-button/sync-button.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { ValueCheckerComponent } from './components/value-checker/value-checker.component';
import {FilesComponent} from './pages/updates/files/files.component';
import {SwitchPortComponent} from './components/switch-port/switch-port.component';
import {AdvancedConfigSwitchComponent} from './pages/networking/advanced-config-switch/advanced-config-switch.component';
import {NetworkStatusComponent} from './pages/networking/network-status/network-status.component';
import {SimpleConfigSwitchComponent} from './pages/networking/simple-config-switch/simple-config-switch.component';

@NgModule({
    declarations: [
        AppComponent,
        InputOutputComponent,
        NetworkingComponent,
        RetrovisionComponent,
        VideoprotectionComponent,
        RefreshButtonComponent,
        PageHeaderComponent,
        SyncButtonComponent,
        UpdatesComponent,
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
        BrowserAnimationsModule,
        FilesComponent,
        SwitchPortComponent,
        AdvancedConfigSwitchComponent,
        NetworkStatusComponent,
        SimpleConfigSwitchComponent,
        ValueCheckerComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
  exports: [
    PageHeaderComponent
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
