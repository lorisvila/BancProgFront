import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {CommunicationService} from './communication.service';
import {ConfigNetworking, DeviceNetworkParams} from '../types';

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  showModalDeviceInformations: boolean = false
  dataModalDeviceInformations: {name: string, value: string}[] | undefined = undefined

  constructor(
    public MainService: MainService,
    public CommunicationService: CommunicationService
  ) {}

  openDeviceModal(deviceGroup: ConfigNetworking, device: DeviceNetworkParams) {
    this.dataModalDeviceInformations = [
      {name: 'Type', value: deviceGroup.name},
      {name: 'Désignation', value: deviceGroup.des},
      {name: 'Addresse IP', value: device.IP},
      {name: 'Masque', value: device.SubnetMask},
      {name: 'Communique ?', value: device.IsAlive ? 'Oui' : 'Non'},
    ]
    this.showModalDeviceInformations = true;
  }

}
