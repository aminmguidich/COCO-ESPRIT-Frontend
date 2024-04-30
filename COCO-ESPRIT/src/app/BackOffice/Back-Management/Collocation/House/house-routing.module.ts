import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateHouseComponent } from './update-house/update-house.component';

const routes: Routes = [
  {
    path: "updateHouse/:id", component: UpdateHouseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
