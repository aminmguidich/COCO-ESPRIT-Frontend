import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListHouseComponent } from './list-house/list-house.component';
import { UpdateHouseComponent } from 'src/app/BackOffice/Back-Management/Collocation/House/update-house/update-house.component';

const routes: Routes = [
  {
    path:"",component:ListHouseComponent
  },
  {
    path: "updateHouse/:id", component: UpdateHouseComponent,
  }
  
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
