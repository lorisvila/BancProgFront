import {EventEmitter, Injectable} from '@angular/core';
import {
  API_ResponseType,
  BancConfig,
  Card,
  Commande,
  ConfigNetworking,
  ErrorInListType,
  Etat,
  GPIOModule,
  Pinout,
  SwitchConfigType
} from '../types';
import {CommunicationService} from './communication.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

	/*Global API / App variables*/

	bancConfigurations: BancConfig[]
  actualBancConfiguration: BancConfig
  actualEtats: Etat[]
  commandsAvailable: Commande[]
  bancCards: Card[]
  bancModules: GPIOModule[]
  bancPinout: Pinout[]
  networkDevices: ConfigNetworking[]
  networkDevicesSubject: Subject<ConfigNetworking[]> = new Subject()
  switchConfiguration: SwitchConfigType
  switchConfigurationSubject: Subject<SwitchConfigType> = new Subject()

  /*App & API Events*/

  valuesUpdated$: EventEmitter<string> = new EventEmitter<string>()
  refreshed$: EventEmitter<boolean> = new EventEmitter<boolean>()

  /*Tabs monitoring*/

  selectedTabFromUrl: string | undefined = undefined

  constructor(
	  private communicationService: CommunicationService,
	  private notif: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.communicationService.connectedToWsAPI.subscribe(value => {
      if (value) {
        this.totalRefreshData()
      }
    })
    this.communicationService.messageFromWsAPI.subscribe(message => {
      this.handleMessage(message)
    })

    /*Subscribe to the url and update the Current Tab var*/
    this.route.fragment.subscribe(fragment => {
      this.selectedTabFromUrl = fragment
    })
  }

  resyncGpioModules() {
    this.communicationService.wsRequestToAPI(['updateRegisters'])
  }

  totalRefreshData() {
    let valuesToRefresh = ['networkDevicesStatus', 'allConfigs', 'currentConfig', 'allCards', 'allModules', 'bancPinout', 'availableCommands', 'allEtats', 'getSwitchData']
    this.communicationService.wsRequestToAPI(valuesToRefresh, {refresh: true})
  }

  partialRefreshData() {
    let valuesToRefresh = ['networkDevicesStatus', 'allCards', 'allModules', 'allEtats', 'availableCommands', 'getSwitchData']
    this.communicationService.wsRequestToAPI(valuesToRefresh, {refresh: true})
  }

  changeConfiguration(configurationName: string) {
    this.communicationService.wsRequestToAPI(['changeConfiguration'], {options: {changeConfiguration: {configurationName: configurationName}}})
  }

  showPastErrors(errors: ErrorInListType[]) {
    for (let errorId in errors) {
      let error = errors[errorId];
      this.notif.error(error.errorObject.message)
    }
  }

  handleMessage(message: API_ResponseType) {
    switch (message.dataName) {
      case "errors": {
        this.showPastErrors(message.data as ErrorInListType[])
        break;
      }
      case "networkDevicesStatus": {
        this.networkDevices = [...message.data as ConfigNetworking[]]
        this.networkDevicesSubject.next(message.data)
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
      case "getSwitchData": {
        this.switchConfiguration = {...message.data} as SwitchConfigType
        this.switchConfigurationSubject.next(message.data)
        break;
      }
      case "refreshedFinsish": {
        this.refreshed$.emit(true)
        break;
      }
      case "updateRegisters": {
        this.refreshed$.emit(true)
        this.notif.info("Les module GPIO ont été resynchronisés")
        break;
      }
      default: {
        this.notif.warning(`Message ${message.dataName} reçu de l'API mais je aucune function affectée...`)
        return;
      }
    }
    this.valuesUpdated$.emit(message.dataName)
  }

  addTabToUrl(event: any) {
    let tabName = event.detail.selectedKey
    this.selectedTabFromUrl = tabName
    this.router.navigate([], {
      relativeTo: this.route,
      fragment: tabName,
      queryParamsHandling: 'merge'
    });
  }

  addParamToUrl(paramater: string, value: string) {
    let queryParams = {}
    queryParams[paramater] = value
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
  }

}
