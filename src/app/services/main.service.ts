import {ElementRef, EventEmitter, Injectable, ViewChild} from '@angular/core';
import {API_ResponseType, BancConfig, Card, Commande, Etat} from '../types';
import {CommunicationService} from './communication.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {WcsRadioGroup} from 'wcs-angular';
import {RadioGroup} from 'wcs-core/dist/types/components/radio-group/radio-group';

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

  refreshing: {
    bancConfigurations: boolean,
    actualBancConfiguration: boolean,
    actualEtats: boolean,
    commandsAvailable: boolean,
    bancCards: boolean,
  } = {
    bancConfigurations: false,
    actualBancConfiguration: false,
    actualEtats: false,
    commandsAvailable: false,
    bancCards: false,
  }

  constructor(
	  private communicationService: CommunicationService,
	  private notif: ToastrService,
    private router: Router,
  ) {
    this.refreshData()
  }


  refreshData() {

    this.refreshing.bancConfigurations = true
	  this.communicationService.requestToAPI(this.communicationService.API_General_GetAllConfigs).subscribe(
		  response => {
			  this.bancConfigurations = (response as API_ResponseType).data as BancConfig[]
        this.refreshing.bancConfigurations = false
		  }, error => {
        this.refreshing.bancConfigurations = false
			  let API_Message = error.error as API_ResponseType
			  this.notif.error(API_Message.status.message, "Aïe")
		  }
	  )

    this.refreshing.actualBancConfiguration = true
	  this.communicationService.requestToAPI(this.communicationService.API_General_GetCurrentConfig).subscribe(
		  response => {
        this.refreshing.actualBancConfiguration = false
			  this.actualBancConfiguration = (response as API_ResponseType).data as BancConfig
		  }, error => {
        this.refreshing.actualBancConfiguration = false
        this.communicationService.handleError(error)
		  }
	  )

    this.refreshing.actualEtats = true
	  this.communicationService.requestToAPI(this.communicationService.API_Commands_GetAllEtats).subscribe(
		  response => {
        this.refreshing.actualEtats = false
			  this.actualEtats = (response as API_ResponseType).data as Etat[]
		  }, error => {
        this.refreshing.actualEtats = false
        this.communicationService.handleError(error)
		  }
	  )

    this.refreshing.commandsAvailable = true
	  this.communicationService.requestToAPI(this.communicationService.API_Commands_GetAvailableCommands).subscribe(
		  response => {
        this.refreshing.commandsAvailable = false
			  this.commandsAvailable = (response as API_ResponseType).data as Commande[]
		  }, error => {
        this.refreshing.commandsAvailable = false
        this.communicationService.handleError(error)
		  }
	  )

    this.refreshing.bancCards = true
    this.communicationService.requestToAPI(this.communicationService.API_GPIO_ReadAllCards).subscribe(
      response => {
        this.refreshing.bancCards = false
        this.bancCards = (response as API_ResponseType).data as Card[]
      }, error => {
        this.refreshing.bancCards = false
        this.communicationService.handleError(error)
      }
    )

  }

}
