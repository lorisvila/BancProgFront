import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service';
import {NetworkingService} from '../../services/networking.service';
import {SwitchChangeEventDetail} from 'wcs-core';

@Component({
  selector: 'app-networking',
  templateUrl: './networking.component.html',
  styleUrls: ['./networking.component.scss']
})
export class NetworkingComponent implements OnInit {

  showDeviceIp: boolean = false;

  constructor(
    public MainService: MainService,
    public NetworkingService: NetworkingService,
  ) { }

  ngOnInit(): void {
  }

  toggleDeviceIp(event: MouseEvent): void {
    this.showDeviceIp = !this.showDeviceIp
  }

}
