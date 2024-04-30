import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListHouseComponent } from './list-house/list-house.component';

const routes: Routes = [
  {
    path:"",component:ListHouseComponent
  },
  
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
