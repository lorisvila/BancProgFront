import { Component } from '@angular/core';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.scss']
})
export class SyncButtonComponent {

  constructor(
    public MainService: MainService
  ) {
  }

}
