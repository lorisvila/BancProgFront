import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service';
import {NetworkingService} from '../../services/networking.service';

@Component({
  selector: 'app-networking',
  templateUrl: './networking.component.html',
  styleUrls: ['./networking.component.scss']
})
export class NetworkingComponent implements OnInit {

  constructor(
    public MainService: MainService,
    public NetworkingService: NetworkingService,
  ) { }

  ngOnInit(): void {
  }
}
