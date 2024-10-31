import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {API_ResponseType, WebSocketRequestType} from '../types';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  /*API_HOST: string = '10.126.0.1';*/
  API_HOST: string = '127.0.0.1';

  API_REST_PORT: number = 8080;
	API_REST_Address: URL = new URL(`http://${this.API_HOST}:${this.API_REST_PORT}/`)

  API_WS_PORT: number = 8081;
	API_WS_Address: URL = new URL(`ws://${this.API_HOST}:${this.API_WS_PORT}`)
  API_WS: WebSocket

  connectedToWsAPI: EventEmitter<boolean> = new EventEmitter<boolean>()
  messageFromWsAPI: EventEmitter<API_ResponseType> = new EventEmitter<API_ResponseType>();
  connectionTime: Date

	constructor(
		public http: HttpClient,
    public notif: ToastrService
	) {
    this.wsConnectToAPI()
	}

  wsConnectToAPI() {
    this.connectionTime = new Date()
    this.API_WS = new WebSocket(this.API_WS_Address)
    this.API_WS.addEventListener('open', () => {
      this.connectedToWsAPI.emit(true)
    })
    this.API_WS.addEventListener('close', () => {
      this.connectedToWsAPI.emit(false)
      if ((new Date().getTime() - this.connectionTime.getTime()) / 1000 > 1) {
        this.notif.warning("Vous venez de vous déconnecter de l'API...")
      } else {
        this.notif.error("L'API n'est pas disponible...")
      }
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

}
