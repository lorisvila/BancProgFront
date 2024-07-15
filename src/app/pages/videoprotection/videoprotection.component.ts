import { Component } from '@angular/core';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-videoprotection',
  templateUrl: './videoprotection.component.html',
  styleUrls: ['./videoprotection.component.scss']
})
export class VideoprotectionComponent {

  constructor(
    public MainService: MainService,
  ) {
  }

  // CAM PANASONIC - rtsp://10.2.1.12/ONVIF/MediaInput?profile=def_profile1
  // CAM 360° - rtsp://10.2.1.11:554/0/onvif/profile1/media.smp

}
