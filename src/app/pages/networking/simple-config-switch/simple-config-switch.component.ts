import {AfterViewInit, Component} from '@angular/core';
import {SwitchComponent} from '../../../components/switch/switch.component';
import {WcsAngularModule} from 'wcs-angular';
import {NetworkingService} from '../../../services/networking.service';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MainService} from '../../../services/main.service';
import {ValueCheckerComponent} from '../../../components/value-checker/value-checker.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-simple-config-switch',
  standalone: true,
  imports: [
    SwitchComponent,
    WcsAngularModule,
    FormlyModule,
    ReactiveFormsModule,
    ValueCheckerComponent
  ],
  templateUrl: './simple-config-switch.component.html',
  styleUrl: './simple-config-switch.component.scss'
})
export class SimpleConfigSwitchComponent implements AfterViewInit{

  constructor(
    public networkingService: NetworkingService,
    public mainService: MainService,
  ) {}

  /*Listen properly to changes in a certain field of the form to update other fields :
  *
  * key: 'firstName'
  * hooks: {
  *   onInit: (field: FormlyFieldConfig) => {
  *     field.form.get('firstName').valueChanges.subscribe(newName => {
  *       this.store.dispatch(new FirstNameChanged(newName);
  *     });
  *   },
  * },
  *
  * */

  private switchConfigurationsSubject = new Subject<{ value: string, label: string, disabled?: boolean}[]>();

  ngAfterViewInit() {
    // Subscribe to the switchConfiguration Subject to update accordingly the options
    this.mainService.switchConfigurationSubject.subscribe((value) => {
      let data = (value && value.architectures.length > 0) ? value.architectures.map(({name}) => ({label: name, value: name})) : [{label: 'Rien', value: '', disabled: true}]
      this.switchConfigurationsSubject.next(data)
    })
    // Set the variable at the beggining if the objectHasAlreadyBeingInitialized
    this.switchConfigurationsSubject.next((this.mainService.switchConfiguration && this.mainService.switchConfiguration.architectures.length > 0) ? this.mainService.switchConfiguration.architectures.map(({name}) => ({label: name, value: name})) : [{label: 'Rien', value: '', disabled: true}])
  }

  switchConfigFormFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'column-form',
      fieldGroup: [
        {
          id: 'architectureName',
          key: 'architectureName',
          type: 'select',
          props: {
            required: true,
            label: "Configuration à charger",
            placeholder: "",
            options: this.switchConfigurationsSubject
          }
        }
      ]
    }
  ]

  protected readonly Object = Object;
}
