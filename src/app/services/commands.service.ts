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

  moduleNumberSelected: number = undefined
  moduleSelected: GPIOModule | undefined = undefined

  compiledModuleData: AppModulePin[]

  constructor(
	  public CommunicationService: CommunicationService,
	  public MainService: MainService,
    public notif: ToastrService
  ) {
    this.MainService.valuesUpdated.subscribe(dataName => {
      if (dataName == 'allCards') {
        this.updateSelectedCard()
      }
      if (dataName == 'allModules') {
        this.updateSelectedModule()
      }
    })
  }

	sendSimpleCommand(commandName: string, event: any) {
    let buttonComponent = (event as PointerEvent).target as unknown as WcsButton
    buttonComponent.loading = true
    buttonComponent.disabled = true
    this.CommunicationService.wsRequestToAPI(['sendCommand'], {options: {sendCommand: {commandName: commandName}}})
	}

  updateSelectedCard() {
    this.cardSelected = this.MainService.bancCards.find(card => card.cardName == this.cardStringSelected)
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

  changeSelectedModuleFromString(moduleId: number | string) {
    moduleId = typeof moduleId === 'string' ? parseInt(moduleId) : moduleId
    let foundModule: GPIOModule | undefined = this.MainService.bancModules.find(module => module.API_Address == moduleId)
    if (!foundModule) {
      this.notif.error("Le module demandé n'a pas été trouvée... Bizzare", 'Aïe')
      return
    }
    this.moduleSelected = foundModule
    this.moduleNumberSelected = moduleId
    this.updateCompiledModuleData()
  }

  changeSelectedModuleFromEvent(event: any) {
    let value = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    if (Number.isNaN(value)) {
      this.notif.error("La carte demandée n'est pas valide...")
      return;
    }
    this.moduleNumberSelected = value
    let foundModule: GPIOModule | undefined = this.MainService.bancModules.find(card => card.API_Address == this.moduleNumberSelected)
    if (!foundModule) {
      this.notif.error("La carte demandé n'a pas été trouvée... Bizzare", 'Aïe')
      return
    }
    this.moduleSelected = foundModule
    this.updateCompiledModuleData()
  }

  updateSelectedModule() {
    this.moduleSelected = this.MainService.bancModules.find(module => module.API_Address == this.moduleNumberSelected)
    this.updateCompiledModuleData()
  }

  updateCompiledModuleData() {
    let newCompiledModuleData = []
    for (let registerPinGroupId in  this.MainService.bancPinout) {
      let registerPinGroup: Pinout = this.MainService.bancPinout[registerPinGroupId]
      for (let pinId in registerPinGroup.pins) {
        let pin: number = registerPinGroup.pins[pinId];
        newCompiledModuleData.push({
          pin: pin,
          module: this.moduleSelected.API_Address,
          state: (this.moduleSelected.registers[registerPinGroup.register_number] >> registerPinGroup.pins.indexOf(pin)) & 0x1,
          GPIO_register: registerPinGroup.GPIO_register_address_HEX,
          IODIR_register: registerPinGroup.IODIR_register_address_HEX
        })
      }
    }
    this.compiledModuleData = newCompiledModuleData;
  }

  sendCardPinToggle(numberOnCard: string, event: any) {
    let state: boolean = ((event as PointerEvent).target as unknown as WcsSwitch).checked
    this.CommunicationService.wsRequestToAPI(['writeToCard'], {
      options: {
        writeToCard: {
          cardName: this.cardStringSelected,
          numberOnCard: numberOnCard,
          state: state
        }
      }
    })
  }

  sendModulePinToggle(pin: number, event: any) { // TODO : Add the write to module function
    let state: boolean = ((event as PointerEvent).target as unknown as WcsSwitch).checked
    this.CommunicationService.wsRequestToAPI(['writeToModule'], {
      options: {
        writeToModule: {
          module: this.moduleNumberSelected,
          pin: pin,
          state: state
        }
      }
    })
  }

}
