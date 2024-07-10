import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InputOutputComponent} from "./pages/input-output/input-output.component";
import {NetworkingComponent} from "./pages/networking/networking.component";
import {RetrovisionComponent} from './pages/retrovision/retrovision.component';
import {VideoprotectionComponent} from './pages/videoprotection/videoprotection.component';


const routes: Routes = [
  {
    path: 'Networking',
    component: NetworkingComponent
  },
  {
    path: 'InputOutput',
    component: InputOutputComponent
  },
  {
    path: 'Retrovision',
    component: RetrovisionComponent
  },
  {
    path: 'VideoProtection',
    component: VideoprotectionComponent
  },
  {
    path: '**',
    redirectTo: 'Networking'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
