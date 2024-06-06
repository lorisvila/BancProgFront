import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service';
import {CommandsService} from '../../services/commands.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.scss']
})
export class InputOutputComponent {

  selectedTabFromUrl: string | undefined = undefined

  constructor(
	  public MainService: MainService,
	  public CommandsService: CommandsService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.fragment.subscribe(fragment => {
      this.selectedTabFromUrl = fragment
    })
}


changeUrlToTab(event: any) {
  let new_tab = event.detail.selectedKey
  this.selectedTabFromUrl = new_tab
  this.router.navigate( [ '/InputOutput' ], { fragment: new_tab } )
}

}
