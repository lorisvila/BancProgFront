import {Component, Input} from '@angular/core';
import {SwitchPortComponent} from '../switch-port/switch-port.component';
import {NetworkingService} from '../../services/networking.service';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WcsAngularModule} from 'wcs-angular';
import {Subject} from 'rxjs';
import {MainService} from '../../services/main.service';
import {ConfigNetworking, DeviceNetworkParams} from '../../types';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [
    SwitchPortComponent,
    FormlyModule,
    FormsModule,
    WcsAngularModule,
    ReactiveFormsModule
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {

  @Input() allowConfiguration: boolean = false;

  devicesListSubject = new Subject<{ value: string, label: string, disabled?: boolean}[]>();

  constructor(
    protected networkingService: NetworkingService,
    protected mainService: MainService,
  ) {
    this.mainService.networkDevicesSubject.subscribe((value) => {
      this.devicesListSubject.next(this.returnAllDevices(value).map(({name}) => ({label: name, value: name})))
    })
    this.mainService.networkDevices ? this.devicesListSubject.next(this.returnAllDevices(this.mainService.networkDevices).map(({name}) => ({label: name, value: name}))) : undefined
  }

  returnAllDevices(devicesGroups: ConfigNetworking[]): DeviceNetworkParams[] {
    let devices: DeviceNetworkParams[] = []
    devicesGroups.forEach((group) => {
      devices = [...devices, ...group.addresses]
    })
    return devices
  }

  modalPortConfigFormFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'column-form',
      fieldGroup: [
        {
          key: 'device',
          id: 'device',
          type: 'select',
          props: {
            required: true,
            options: this.devicesListSubject,
            styles: {input: {position: "relative", height: "15em"}}
          }
        }
      ]
    }
  ]

}
