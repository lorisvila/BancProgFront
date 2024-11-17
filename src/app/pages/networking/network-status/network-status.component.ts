import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {WcsAngularModule} from 'wcs-angular';
import {NetworkingService} from '../../../services/networking.service';
import {MainService} from '../../../services/main.service';
import {ValueCheckerComponent} from '../../../components/value-checker/value-checker.component';

@Component({
  selector: 'app-network-status',
  standalone: true,
  imports: [
    NgIf,
    WcsAngularModule,
    NgForOf,
    ValueCheckerComponent
  ],
  templateUrl: './network-status.component.html',
  styleUrl: './network-status.component.scss'
})
export class NetworkStatusComponent {

  showDeviceIp: boolean = false;

  constructor(
    public networkingService: NetworkingService,
    public mainService: MainService,
  ) {
  }

  toggleDeviceIp(event: MouseEvent): void {
    this.showDeviceIp = !this.showDeviceIp
  }

}
