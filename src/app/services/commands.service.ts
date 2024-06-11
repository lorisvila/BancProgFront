import { Injectable } from '@angular/core';
import {CommunicationService} from './communication.service';
import {MainService} from './main.service';
import {ToastrService} from 'ngx-toastr';
import {AppModulePin, Card, GPIOModule, Pinout} from '../types';
import {Components, RadioGroupChangeEventDetail} from 'wcs-core';
import WcsButton = Components.WcsButton;
import {WcsSwitch} from 'wcs-angular';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  cardStringSelected: string = ""
  cardSelected: Card | undefined = undefined

  moduleStringSelected: string = ""
  moduleSelected: GPIOModule | undefined = undefined

  compiledModuleData: AppModulePin[]

  constructor(
	  public CommunicationService: CommunicationService,
	  public MainService: MainService,
    public notif: ToastrService
  ) { }

	sendSimpleCommand(commandName: string, event: any) {
    let buttonComponent = (event as PointerEvent).target as unknown as WcsButton
    buttonComponent.loading = true
    buttonComponent.disabled = true
    let url = new URL(this.CommunicationService.API_Commands_SendCommand.href.replace('$commandName', commandName))
    this.CommunicationService.requestToAPI(url).subscribe(
      response => {
        setTimeout(() => {
          this.MainService.refreshData();
        }, 1500)
      }, error => {
        this.CommunicationService.handleError(error)
      }
    )
	}

  changeSelectedCardFromString(cardName: string) {
    let foundCard: Card | undefined = this.MainService.bancCards.find(card => card.cardName == cardName)
    if (!foundCard) {
      this.notif.error("La carte demandé n'a pas été trouvée... Bizzare", 'Aïe')
      return
    }
    this.cardSelected = foundCard
    this.cardStringSelected = cardName
  }

  changeSelectedCardFromEvent(event: any) {
    this.cardStringSelected = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    let foundCard: Card | undefined = this.MainService.bancCards.find(card => card.cardName == this.cardStringSelected)
    if (!foundCard) {
      this.notif.error("La carte demandé n'a pas été trouvée... Bizzare", 'Aïe')
      return
    }
    this.cardSelected = foundCard
  }

  changeSelectedModuleFromEvent(event: any) {
    let value = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    if (Number.isNaN(value)) {
      this.notif.error("La carte demandée n'est pas valide...")
      return;
    }
    this.moduleStringSelected = value
    let foundModule: GPIOModule | undefined = this.MainService.bancModules.find(card => card.API_Address == parseInt(this.moduleStringSelected))
    if (!foundModule) {
      this.notif.error("La carte demandé n'a pas été trouvée... Bizzare", 'Aïe')
      return
    }
    this.moduleSelected = foundModule
    this.updateCompiledModuleData()
  }

  updateCompiledModuleData() {
    this.compiledModuleData = [];
    for (let registerPinGroupId in  this.MainService.bancPinout) {
      let registerPinGroup: Pinout = this.MainService.bancPinout[registerPinGroupId]
      for (let pinId in registerPinGroup.pins) {
        let pin: number = registerPinGroup.pins[pinId];
        console.log(registerPinGroup)
        this.compiledModuleData.push({
          pin: pin,
          module: this.moduleSelected.API_Address,
          state: (this.moduleSelected.registers[registerPinGroup.register_number] >> registerPinGroup.pins.indexOf(pin)) & 0x1,
          GPIO_register: registerPinGroup.GPIO_register_address_HEX,
          IODIR_register: registerPinGroup.IODIR_register_address_HEX
        })
      }
    }
  }

  sendCardPinToggle(NumberOnCard: string, event: any) {
    let state: boolean = !((event as PointerEvent).target as unknown as WcsSwitch).checked
    let url: URL = new URL(this.CommunicationService.API_GPIO_WriteToCard.href
      .replace('$card', this.cardSelected.cardName)
      .replace('$numberOnCard', NumberOnCard)
      .replace('$state', state.toString()));
    this.CommunicationService.requestToAPI(url).subscribe(
      response => {
        setTimeout(() => {
          this.MainService.refreshData();
        }, 1500)
      }, error => {
        this.CommunicationService.handleError(error)
      }
    )
  }

  sendModulePinToggle(pin: number, event: any) { // TODO : Add the write to module function
    let state: boolean = !((event as PointerEvent).target as unknown as WcsSwitch).checked
    let url: URL = new URL(this.CommunicationService.API_GPIO_WriteToModule.href
      .replace('$module', this.moduleSelected.API_Address.toString())
      .replace('$pin', pin.toString())
      .replace('$state', state.toString()));
    this.CommunicationService.requestToAPI(url).subscribe(
      response => {
        setTimeout(() => {
          this.MainService.refreshData();
        }, 1500)
      }, error => {
        this.CommunicationService.handleError(error)
      }
    )
  }

}
