import { Component } from '@angular/core';
import {WcsAngularModule} from 'wcs-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {UpdatingService} from '../../../services/updating.service';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    WcsAngularModule,
    ReactiveFormsModule,
    FormlyModule
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent {

  constructor(
    public updatingService: UpdatingService,
  ) {
  }

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'column-form',
      fieldGroup: [
        {
          key: 'file',
          type: 'input',
          props: {
            type: 'file',
            label: 'Fichier à téléverser',
            required: true,
          },
          expressions: {
            'wcs-change': () => {}
          }
        },
        {
          key: 'equipement',
          type: 'select',
          props: {
            label: 'Equipement',
            options: [{label: "Rien", value:'rien'}],
          }
        }]
    },
  ];

}
