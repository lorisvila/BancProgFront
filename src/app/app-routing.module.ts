import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InputOutputComponent} from "./pages/input-output/input-output.component";
import {NetworkingComponent} from "./pages/networking/networking.component";


const routes: Routes = [
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
    redirectTo: 'InputOutput'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
