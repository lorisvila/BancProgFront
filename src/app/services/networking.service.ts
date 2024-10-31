import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {CommunicationService} from './communication.service';
import {ConfigNetworking, DeviceNetworkParams, PortConfigType, SwitchConfigType, SwitchPortType} from '../types';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  showModalDeviceInformations: boolean = false
  dataModalDeviceInformations: {name: string, value: string}[] | undefined = undefined
  selectedDevice: DeviceNetworkParams | undefined = undefined

  showModalPortConfig: boolean = false
  modalPortConfigForm: FormGroup = new FormGroup({})
  modalPortConfigFormModel: SwitchPortType

  switchConfigForm: FormGroup = new FormGroup({})
  switchConfigFormModel: {[name: string]: any} = {}

  constructor(
    public mainService: MainService,
    public communicationService: CommunicationService,
    public notif: ToastrService,
  ) {}

  openDeviceModal(deviceGroup: ConfigNetworking, device: DeviceNetworkParams) {
    this.selectedDevice = device
    this.dataModalDeviceInformations = [
      {name: 'Nom', value: device.name},
      {name: 'Type', value: deviceGroup.des},
      {name: 'Famille', value: deviceGroup.family},
      {name: 'Addresse IP', value: device.IP},
      {name: 'Masque', value: device.SubnetMask},
      {name: 'Réponse Ping ?', value: device.IsAlive ? 'Oui' : 'Non'},
    ]
    this.showModalDeviceInformations = true;
  }

  numToLetters = (n: number): string => {
    let result = '';
    while (n > 0) {
      let remainder = (n - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result;
      n = Math.floor((n - 1) / 26);
    }
    return result.toLowerCase();
  };

  get stringArrayGridTemplateAreas(): string {
    let string = ""
    this.arrayGridTemplateAreas.forEach((line: string[]) => {
      string += `"${line.join(" ")}"`
    })
    return string
  }

  get arrayGridTemplateAreas(): string[][] {
    let array: string[][] = []
    this.mainService.switchConfiguration?.display.forEach((line: string[]) => {
      let newLine = []
      line.forEach((port: string) => {
        newLine = [...newLine, this.portLetterInterface[port]]
      })
      array = [...array, newLine]
    })
    return array
  }

  get portLetterInterface(): {[port: string]: string} {
    let interf: {} = {}
    this.mainService.switchConfiguration.display.forEach((line: string[], index1) => {
      line.forEach((port: string, index2) => {
        interf[port] = this.numToLetters((index1)*line.length + index2 + 1)
      })
    })
    return interf
  }

  sendSwitchArchitecture(architectureName?: string) {
    if (!architectureName) {
      architectureName = this.switchConfigFormModel.architectureName
    }
    let foundArchitecture = this.mainService.switchConfiguration.architectures.find((architecture) => architecture.name == architectureName)
    if (!foundArchitecture) {
      this.notif.error("L'architecture souhaitée n'a pas été trouvée...", "Aïe...")
      return
    }
    this.communicationService.wsRequestToAPI(['sendSwitchArchitecture'], {options: {sendSwitchArchitecture: {architecture: foundArchitecture}}})
  }

}
