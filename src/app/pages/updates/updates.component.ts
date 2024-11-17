import { Component } from '@angular/core';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent {

  constructor(
    public mainService: MainService,
  ) {
  }

}
