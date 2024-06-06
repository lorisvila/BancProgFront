import { Component } from '@angular/core';
import { WcsTabChangeEvent } from 'wcs-core';
import {CommunicationService} from './services/communication.service';
import {MainService} from './services/main.service';

@Component({
  selector: 'app-root',
  template: `
    <wcs-header>
      <img slot="logo" src="./assets/sncf-logo.png" alt="Logo SNCF" routerLink="">
      <h1 slot="title">Banc de configuration S.DOT</h1>
      <div slot="actions">
        <div>
          <wcs-select *ngIf="MainService.actualBancConfiguration && MainService.bancConfigurations" placeholder="Configuration" size="m" id="config_select" [value]="MainService.actualBancConfiguration.Name">
            <wcs-select-option *ngFor="let configuration of MainService.bancConfigurations" [value]="configuration.Name">
				        {{configuration.Name}}
			      </wcs-select-option>
          </wcs-select>
        </div>
        <div *ngIf="!MainService.actualBancConfiguration || !MainService.bancConfigurations">
          <wcs-badge class="wcs-danger">Impossible de charger les configurations</wcs-badge>
        </div>
      </div>
    </wcs-header>
    <wcs-nav>
      <wcs-nav-item text="Entrées / Sorties" routerLink="/InputOutput" role="link" data-href="/InputOutput" routerLinkActive="active">
        <wcs-mat-icon icon="hub"></wcs-mat-icon>
      </wcs-nav-item>
      <wcs-nav-item text="Equipements réseau" routerLink="/Networking" role="link" data-href="/Networking" routerLinkActive="active">
        <wcs-mat-icon icon="data_thresholding"></wcs-mat-icon>
      </wcs-nav-item>
    </wcs-nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    #config_select {
      min-width: 15em;
    }
    :host {
      display: grid;
      grid-template-areas: "header header" "nav content";
      grid-template-columns: auto 1fr;
      height: 100vh;
      overflow-y: hidden;
    }
    main {
      grid-area: content;
      padding: 16px;
      overflow-y: auto;
      height: calc(100vh - 64px - 16px - 16px);
    }
    wcs-nav {
      grid-area: nav;
    }
    wcs-header {
      grid-area: header;
    }
	img {
		cursor: pointer;
	}
  `]
})
export class AppComponent {

	constructor(
		public CommunicationService: CommunicationService,
		public MainService: MainService
	) {
	}

}
