import {Component, ElementRef, Input, SimpleChanges} from '@angular/core';
import {SwitchPortType} from '../../types';
import {WcsAngularModule} from 'wcs-angular';
import {NetworkingService} from '../../services/networking.service';

@Component({
  selector: 'app-switch-port',
  standalone: true,
  imports: [
    WcsAngularModule
  ],
  templateUrl: './switch-port.component.html',
  styleUrl: './switch-port.component.scss'
})
export class SwitchPortComponent {

  @Input() port: SwitchPortType;
  @Input() allowConfiguration: boolean = false;

  constructor(
    private elementRef: ElementRef,
    protected networkingService: NetworkingService,
  ) {}

  ngOnInit() {
    this.updateGridAreaStyle();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.port && !changes.port.isFirstChange()) {
      this.updateGridAreaStyle();
    }
  }

  private updateGridAreaStyle() {
    this.elementRef.nativeElement.style.gridArea = this.networkingService.portLetterInterface[this.port.port];
  }

}
