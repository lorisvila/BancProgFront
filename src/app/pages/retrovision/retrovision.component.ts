import { Component } from '@angular/core';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-retrovision',
  templateUrl: './retrovision.component.html',
  styleUrls: ['./retrovision.component.scss']
})
export class RetrovisionComponent {

  constructor(
    public MainService: MainService,
  ) {
  }

}
