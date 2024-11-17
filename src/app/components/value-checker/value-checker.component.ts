import {AfterViewInit, Component, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';
import {WcsAngularModule} from 'wcs-angular';

@Component({
  standalone: true,
  selector: 'app-value-checker',
  templateUrl: './value-checker.component.html',
  imports: [
    WcsAngularModule
  ],
  styleUrls: ['./value-checker.component.scss']
})
export class ValueCheckerComponent {

  @Input() variable!: any;
  @Input() variableName: string;
  @Input() needsMargin: boolean;

}
