import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {API_ResponseType, WebSocketRequestType} from '../types';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  API_HOST: string = 'localhost';
  API_REST_PORT: number = 8080;
	API_REST_Address: URL = new URL(`http://${this.API_HOST}:${this.API_REST_PORT}/`)
  API_WS_PORT: number = 8081;
	API_WS_Address: URL = new URL(`ws://${this.API_HOST}:${this.API_WS_PORT}`)
  API_WS: WebSocket
  connectedToWsAPI: EventEmitter<boolean> = new EventEmitter<boolean>()
  messageFromWsAPI: EventEmitter<API_ResponseType> = new EventEmitter<API_ResponseType>();

	API_Base_Commands: string = "/api/v1/commands"
	API_Base_General: string = "/api/v1"
  API_Base_GPIO: string = '/api/v1/gpio'
  API_Base_Network: string = '/api/v1/network/'

	API_Commands_GetAvailableCommands: URL = new URL(this.API_Base_Commands + "/getAvailableCommands", this.API_REST_Address)
	API_Commands_GetAllCommands: URL = new URL(this.API_Base_Commands + "/getAllCommands", this.API_REST_Address)
	API_Commands_SendCommand: URL = new URL(this.API_Base_Commands + "/sendCommand/$commandName", this.API_REST_Address)
	API_Commands_GetAllEtats: URL = new URL(this.API_Base_Commands + "/getAllEtats", this.API_REST_Address)
	API_Commands_GetEtat: URL = new URL(this.API_Base_Commands + '/getEtat/$etatName', this.API_REST_Address)
	API_Commands_RefreshEtats: URL = new URL(this.API_Base_Commands + '/refreshEtats', this.API_REST_Address)

	API_General_GetAllConfigs: URL = new URL(this.API_Base_General + '/getAllConfigs', this.API_REST_Address)
	API_General_GetConfig: URL = new URL(this.API_Base_General + '/getConfig/{configName}', this.API_REST_Address)
	API_General_GetCurrentConfig: URL = new URL(this.API_Base_General + '/getCurrentConfig', this.API_REST_Address)

  API_GPIO_ReadAllCards: URL = new URL(this.API_Base_GPIO + "/readAllCards", this.API_REST_Address)
  API_GPIO_WriteToCard: URL = new URL(this.API_Base_GPIO + "/write/$card/$numberOnCard/$state", this.API_REST_Address)
  API_GPIO_ReadAllModules: URL = new URL(this.API_Base_GPIO + "/readAllModules", this.API_REST_Address)
  API_GPIO_GetPinout: URL = new URL(this.API_Base_GPIO + "/getPinout", this.API_REST_Address)
  API_GPIO_WriteToModule: URL = new URL(this.API_Base_GPIO + "/writeModule/$module/$pin/$state", this.API_REST_Address)

  API_Network_NetworkDervicesStatus: URL = new URL(this.API_Base_Network + '/networkDevicesStatus', this.API_REST_Address)
  API_Network_RefreshNetworkDevicesStatus : URL = new URL(this.API_Base_Network + '/refresh', this.API_REST_Address)

	constructor(
		public http: HttpClient,
    public notif: ToastrService
	) {
    this.wsConnectToAPI()
	}

  wsConnectToAPI() {
    this.API_WS = new WebSocket(this.API_WS_Address)
    this.API_WS.addEventListener('open', () => {
      this.connectedToWsAPI.emit(true)
    })
    this.API_WS.addEventListener('close', () => {
      this.connectedToWsAPI.emit(false)
    })
    this.API_WS.addEventListener('message', (message) => {
      let responseObject: API_ResponseType = JSON.parse(message.data) as API_ResponseType
      if (responseObject.status.code != 200) {
        this.notif.error(responseObject.status.message, `Erreur ${responseObject.status.code}`)
      } else {
        this.messageFromWsAPI.emit(responseObject)
      }
    })
  }

  wsRequestToAPI(queryList: string[],args?: {refresh?: boolean, options?: {}}) {
    if (!args) {
      args = {refresh: false, options: undefined}
    }
    if (args && !args.refresh) {
      args.refresh = false
    }
    if(args && !args.options) {
      args.options = undefined
    }
    let requestObject: WebSocketRequestType = {
      refresh: args.refresh,
      commands: queryList,
      options: args.options
    }
    this.API_WS.send(JSON.stringify(requestObject))
  }

  // OLD Function for the REST API --> Now using Websocket

	httpRequestToAPI(url: URL) {
		return this.http.get(url.href)
	}

  handleError(error: HttpErrorResponse) {
    let API_Message = error.error as API_ResponseType
    if (error.name == "HttpErrorResponse") {
      this.notif.error("Impossible de joindre l'API", "Aïe")
    }
    else if (API_Message.status) {
      this.notif.error(API_Message.status.message, "Aïe")
    }
  }

}
