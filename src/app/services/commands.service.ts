import { Injectable } from '@angular/core';
import {CommunicationService} from './communication.service';
import {MainService} from './main.service';
import {ToastrService} from 'ngx-toastr';
import {Card} from '../types';
import {Components, RadioGroupChangeEventDetail} from 'wcs-core';
import WcsButton = Components.WcsButton;
import {WcsSwitch} from 'wcs-angular';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  cardStringSelected: string = ""
  cardSelected: Card | undefined = undefined

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

  changeSelectedCard(event: any) {
    this.cardStringSelected = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    let foundCard: Card | undefined = this.MainService.bancCards.find(card => card.cardName == this.cardStringSelected)
    if (!foundCard) {
      this.notif.error("La carte demandé n'a pas été trouvée... Bizzare", 'Aïe')
      return
    }
    this.cardSelected = foundCard
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

}
