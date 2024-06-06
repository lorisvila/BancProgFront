import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {InputOutputComponent} from "./pages/input-output/input-output.component";
import {NetworkingComponent} from "./pages/networking/networking.component";


const routes: Routes = [
  {
    path: '',
    component: AccueilComponent
  },
  {
    path: 'InputOutput',
    component: InputOutputComponent
  },
  {
    path: 'Networking',
    component: NetworkingComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
