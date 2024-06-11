import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {API_ResponseType} from '../types';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

	API_Address: URL = new URL("http://localhost:8080/")

	API_Base_Commands: string = "/api/v1/commands"
	API_Base_General: string = "/api/v1"
  API_Base_GPIO: string = '/api/v1/gpio'
  API_Base_Network: string = '/api/v1/network/'

	API_Commands_GetAvailableCommands: URL = new URL(this.API_Base_Commands + "/getAvailableCommands", this.API_Address)
	API_Commands_GetAllCommands: URL = new URL(this.API_Base_Commands + "/getAllCommands", this.API_Address)
	API_Commands_SendCommand: URL = new URL(this.API_Base_Commands + "/sendCommand/$commandName", this.API_Address) // ! Arguments behind
	API_Commands_GetAllEtats: URL = new URL(this.API_Base_Commands + "/getAllEtats", this.API_Address)
	API_Commands_GetEtat: URL = new URL(this.API_Base_Commands + '/getEtat/$etatName', this.API_Address)
	API_Commands_RefreshEtats: URL = new URL(this.API_Base_Commands + '/refreshEtats', this.API_Address)

	API_General_GetAllConfigs: URL = new URL(this.API_Base_General + '/getAllConfigs', this.API_Address)
	API_General_GetConfig: URL = new URL(this.API_Base_General + '/getConfig/{configName}', this.API_Address)
	API_General_GetCurrentConfig: URL = new URL(this.API_Base_General + '/getCurrentConfig', this.API_Address)

  API_GPIO_ReadAllCards: URL = new URL(this.API_Base_GPIO + "/readAllCards", this.API_Address)
  API_GPIO_WriteToCard: URL = new URL(this.API_Base_GPIO + "/write/$card/$numberOnCard/$state", this.API_Address)
  API_GPIO_ReadAllModules: URL = new URL(this.API_Base_GPIO + "/readAllModules", this.API_Address)
  API_GPIO_GetPinout: URL = new URL(this.API_Base_GPIO + "/getPinout", this.API_Address)
  API_GPIO_WriteToModule: URL = new URL(this.API_Base_GPIO + "/writeModule/$module/$pin/$state", this.API_Address)

  API_Network_NetworkDervicesStatus: URL = new URL(this.API_Base_Network + '/networkDevicesStatus', this.API_Address)

	constructor(
		public http: HttpClient,
    public notif: ToastrService
	) {

	}

	requestToAPI(url: URL) {
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
