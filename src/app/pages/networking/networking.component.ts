import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service';
import {NetworkingService} from '../../services/networking.service';
import {SwitchChangeEventDetail} from 'wcs-core';
import {SwitchPortType} from '../../types';

@Component({
  selector: 'app-networking',
  templateUrl: './networking.component.html',
  styleUrls: ['./networking.component.scss']
})
export class NetworkingComponent {

  constructor(
    public mainService: MainService,
    public networkingService: NetworkingService,
  ) {
  }
}
