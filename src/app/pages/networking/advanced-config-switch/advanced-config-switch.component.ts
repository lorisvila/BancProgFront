import { Component } from '@angular/core';
import {SwitchPortComponent} from '../../../components/switch-port/switch-port.component';
import {WcsAngularModule} from 'wcs-angular';
import {NetworkingService} from '../../../services/networking.service';
import {ReactiveFormsModule} from '@angular/forms';
import {SwitchComponent} from '../../../components/switch/switch.component';
import {ValueCheckerComponent} from '../../../components/value-checker/value-checker.component';
import {MainService} from '../../../services/main.service';

@Component({
  selector: 'app-advanced-config-switch',
  standalone: true,
  imports: [
    SwitchPortComponent,
    WcsAngularModule,
    ReactiveFormsModule,
    SwitchComponent,
    ValueCheckerComponent,
  ],
  templateUrl: './advanced-config-switch.component.html',
  styleUrl: './advanced-config-switch.component.scss'
})
export class AdvancedConfigSwitchComponent {

  constructor(
    public networkingService: NetworkingService,
    public mainService: MainService,
  ) {}

}
