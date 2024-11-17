import { Component } from '@angular/core';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.scss']
})
export class RefreshButtonComponent {

  constructor(
    public MainService: MainService,
  ) {
  }

}
