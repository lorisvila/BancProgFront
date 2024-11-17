import { Component } from '@angular/core';
import {MainService} from '../../services/main.service';
import {CommandsService} from '../../services/commands.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RadioGroupChangeEventDetail} from 'wcs-core';
import {Card, GPIOModule} from '../../types';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.scss']
})
export class InputOutputComponent {

  constructor(
	  public mainService: MainService,
	  public commandsService: CommandsService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.mainService.refreshed$.subscribe(() => {
      if (!this.commandsService.cardSelected) {
        this.route.queryParams.subscribe(params => {
          if (params['card']) {
            this.commandsService.changeSelectedCardFromString(params['card'])
          }
        });
      }
      if (!this.commandsService.moduleSelected) {
        this.route.queryParams.subscribe(params => {
          if (params['module']) {
            this.commandsService.changeSelectedModuleFromString(params['module'])
          }
        });
      }
    })
  }

  changeSelectedCardFromEvent(event: any) {
    let cardName: string = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    this.mainService.addParamToUrl('card', cardName)
    this.commandsService.changeSelectedCardFromEvent(event)
  }

  changeSelectedModuleFromEvent(event: any) {
    let moduleName: string = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    this.mainService.addParamToUrl('module', moduleName)
    this.commandsService.changeSelectedModuleFromEvent(event)
  }

  trackCard(index: number, obj: Card) {
    return obj.cardName
  }

  trackModule(index: number, obj: GPIOModule) {
    return obj.API_Address
  }

}
