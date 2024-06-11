import {ElementRef, EventEmitter, Injectable, ViewChild} from '@angular/core';
import {API_ResponseType, BancConfig, Card, Commande, ConfigNetworking, DeviceNetworkParams, Etat, GPIOModule, Pinout} from '../types';
import {CommunicationService} from './communication.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NetworkingComponent} from '../pages/networking/networking.component';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  @ViewChild('radioChangeCard') radioChangeCard: ElementRef;

	// Global variables
	bancConfigurations: BancConfig[]
	actualBancConfiguration: BancConfig
	actualEtats: Etat[]
	commandsAvailable: Commande[]
  bancCards: Card[]
  bancModules: GPIOModule[]
  bancPinout: Pinout[]
  networkDevices: ConfigNetworking[]

  refreshing: {
    bancConfigurations: boolean,
    actualBancConfiguration: boolean,
    actualEtats: boolean,
    commandsAvailable: boolean,
    bancCards: boolean,
    bancModules: boolean,
    bancPinout: boolean,
    networkDevices: boolean,
  } = {
    bancConfigurations: false,
    actualBancConfiguration: false,
    actualEtats: false,
    commandsAvailable: false,
    bancCards: false,
    bancModules: false,
    bancPinout: false,
    networkDevices: false,
  }

  finishedRefreshing: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
	  private communicationService: CommunicationService,
	  private notif: ToastrService,
    private router: Router,
  ) {
    this.refreshData()
  }

  fullRefreshData() {

  }

  refreshData() {

    this.refreshing.bancConfigurations = true
	  this.communicationService.requestToAPI(this.communicationService.API_General_GetAllConfigs).subscribe(
		  response => {
        this.refreshing.bancConfigurations = false
			  this.bancConfigurations = (response as API_ResponseType).data as BancConfig[]
        this.checkIfFinishedLoadingData()
		  }, error => {
        this.refreshing.bancConfigurations = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()

		  }
	  )

    this.refreshing.actualBancConfiguration = true
	  this.communicationService.requestToAPI(this.communicationService.API_General_GetCurrentConfig).subscribe(
		  response => {
        this.refreshing.actualBancConfiguration = false
			  this.actualBancConfiguration = (response as API_ResponseType).data as BancConfig
        this.checkIfFinishedLoadingData()
		  }, error => {
        this.refreshing.actualBancConfiguration = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()
		  }
	  )

    this.refreshing.actualEtats = true
	  this.communicationService.requestToAPI(this.communicationService.API_Commands_GetAllEtats).subscribe(
		  response => {
        this.refreshing.actualEtats = false
			  this.actualEtats = (response as API_ResponseType).data as Etat[]
        this.checkIfFinishedLoadingData()
		  }, error => {
        this.refreshing.actualEtats = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()
		  }
	  )

    this.refreshing.commandsAvailable = true
	  this.communicationService.requestToAPI(this.communicationService.API_Commands_GetAvailableCommands).subscribe(
		  response => {
        this.refreshing.commandsAvailable = false
			  this.commandsAvailable = (response as API_ResponseType).data as Commande[]
        this.checkIfFinishedLoadingData()
		  }, error => {
        this.refreshing.commandsAvailable = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()
		  }
	  )

    this.refreshing.bancCards = true
    this.communicationService.requestToAPI(this.communicationService.API_GPIO_ReadAllCards).subscribe(
      response => {
        this.refreshing.bancCards = false
        this.bancCards = (response as API_ResponseType).data as Card[]
        this.checkIfFinishedLoadingData()
      }, error => {
        this.refreshing.bancCards = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()
      }
    )

    this.refreshing.bancModules = true
    this.communicationService.requestToAPI(this.communicationService.API_GPIO_ReadAllModules).subscribe(
      response => {
        this.refreshing.bancModules = false
        this.bancModules = (response as API_ResponseType).data as GPIOModule[]
        this.checkIfFinishedLoadingData()
      }, error => {
        this.refreshing.bancModules = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()
      }
    )

    this.refreshing.bancPinout = true
    this.communicationService.requestToAPI(this.communicationService.API_GPIO_GetPinout).subscribe(
      response => {
        this.refreshing.bancPinout = false
        this.bancPinout = (response as API_ResponseType).data as Pinout[]
        this.checkIfFinishedLoadingData()
      }, error => {
        this.refreshing.bancPinout = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()
      }
    )

    this.refreshing.networkDevices = true
    this.communicationService.requestToAPI(this.communicationService.API_Network_NetworkDervicesStatus).subscribe(
      response => {
        this.refreshing.networkDevices = false
        this.networkDevices = (response as API_ResponseType).data as ConfigNetworking[]
        this.checkIfFinishedLoadingData()
      }, error => {
        this.refreshing.networkDevices = false
        this.communicationService.handleError(error)
        this.checkIfFinishedLoadingData()
      }
    )

  }

  checkIfFinishedLoadingData() {
    for (let itemId in this.refreshing) {
      let item = this.refreshing[itemId]
      if (item == true) {
        return
      }
    }
    this.finishedRefreshing.emit(true)
  }

}
