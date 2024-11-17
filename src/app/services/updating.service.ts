import { Injectable } from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UpdatingService {

  constructor() { }

  fileForm = new UntypedFormGroup({});
  fileFormModel = {};

  tempVersionsFiles = [
    {
      "device": "Switch Moxa",
      "versions": [
        {
          "firmware": "v1.96.36",
          "configuration": "V1.3"
        }
      ]
    }
  ]


}
