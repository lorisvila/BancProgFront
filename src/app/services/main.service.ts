import {EventEmitter, Injectable} from '@angular/core';
import {API_ResponseType, BancConfig, Card, Commande, ConfigNetworking, Etat, GPIOModule, Pinout} from '../types';
import {CommunicationService} from './communication.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MainService {

	// Global variables
	bancConfigurations: BancConfig[]
	actualBancConfiguration: BancConfig
	actualEtats: Etat[]
	commandsAvailable: Commande[]
  bancCards: Card[]
  bancModules: GPIOModule[]
  bancPinout: Pinout[]
  networkDevices: ConfigNetworking[]

  valuesUpdated: EventEmitter<string> = new EventEmitter<string>()
  refreshed: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
	  private communicationService: CommunicationService,
	  private notif: ToastrService,
  ) {
    this.communicationService.connectedToWsAPI.subscribe(value => {
      if (value) {
        this.totalRefreshData()
      } else {
        this.notif.warning("Vous venez de vous déconnecter de l'API...")
      }
    })
    this.communicationService.messageFromWsAPI.subscribe(message => {
      this.handleMessage(message)
    })
  }

  totalRefreshData() {
    let valuesToRefresh = ['networkDevicesStatus', 'allConfigs', 'currentConfig', 'allCards', 'allModules', 'bancPinout', 'availableCommands', 'allEtats']
    this.communicationService.wsRequestToAPI(valuesToRefresh, {refresh: true})
  }

  partialRefreshData() {
    let valuesToRefresh = ['networkDevicesStatus', 'allCards', 'allModules', 'allEtats', 'availableCommands']
    this.communicationService.wsRequestToAPI(valuesToRefresh, {refresh: true})
  }

  handleMessage(message: API_ResponseType) {
    switch (message.dataName) {
      case "networkDevicesStatus": {
        this.networkDevices = [...message.data as ConfigNetworking[]]
        break;
      }
      case "allConfigs": {
        this.bancConfigurations = [...message.data as BancConfig[]]
        break;
      }
      case "currentConfig": {
        this.actualBancConfiguration = message.data as BancConfig
        break;
      }
      case "allCards": {
        this.bancCards = [...message.data as Card[]]
        break;
      }
      case "allModules": {
        this.bancModules = [...message.data as GPIOModule[]]
        break;
      }
      case "bancPinout": {
        this.bancPinout = [...message.data as Pinout[]]
        break;
      }
      case "availableCommands": {
        this.commandsAvailable = [...message.data as Commande[]]
        break;
      }
      case "allEtats": {
        this.actualEtats = message.data as Etat[]
        break;
      }
      case "refreshedFinsish": {
        this.refreshed.emit(true)
        break;
      }
      default: {
        this.notif.warning(`Message ${message.dataName} reçu de l'API mais je aucune function affectée...`)
        return;
      }
    }
    this.valuesUpdated.emit(message.dataName)
  }

}
