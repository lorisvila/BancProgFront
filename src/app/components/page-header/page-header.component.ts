import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input() pageName!: string;
  @Input() refreshButton: boolean = false;
  @Input() syncButton: boolean = false;


}
