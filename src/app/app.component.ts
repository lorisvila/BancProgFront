import { Component } from '@angular/core';
import {MainService} from './services/main.service';
import {CommunicationService} from './services/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(
		public MainService: MainService,
    public CommunicationService: CommunicationService
	) {
	}
}
