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

  selectedTabFromUrl: string | undefined = undefined

  constructor(
	  public MainService: MainService,
	  public CommandsService: CommandsService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.fragment.subscribe(fragment => {
      this.selectedTabFromUrl = fragment
    })
    this.MainService.refreshed$.subscribe(() => {
      if (!this.CommandsService.cardSelected) {
        this.route.queryParams.subscribe(params => {
          if (params['card']) {
            this.CommandsService.changeSelectedCardFromString(params['card'])
          }
        });
      }
      if (!this.CommandsService.moduleSelected) {
        this.route.queryParams.subscribe(params => {
          if (params['module']) {
            this.CommandsService.changeSelectedModuleFromString(params['module'])
          }
        });
      }
    })
  }


  changeUrlToTab(event: any) {
    let tabName = event.detail.selectedKey
    this.selectedTabFromUrl = tabName
    this.router.navigate([], {
      relativeTo: this.route,
      fragment: tabName,
      queryParamsHandling: 'merge'
    });
  }

  changeSelectedCardFromEvent(event: any) {
    let cardName: string = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    this.MainService.addParamToUrl('card', cardName)
    this.CommandsService.changeSelectedCardFromEvent(event)
  }

  changeSelectedModuleFromEvent(event: any) {
    let moduleName: string = ((event as CustomEvent).detail as RadioGroupChangeEventDetail).value
    this.MainService.addParamToUrl('module', moduleName)
    this.CommandsService.changeSelectedModuleFromEvent(event)
  }

  trackCard(index: number, obj: Card) {
    return obj.cardName
  }

  trackModule(index: number, obj: GPIOModule) {
    return obj.API_Address
  }

}
