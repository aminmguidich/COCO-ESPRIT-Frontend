import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateHouseComponent } from './update-house/update-house.component';
import { ListHouseComponent } from './list-house/list-house.component';

const routes: Routes = [
  {
    path: "updateHouse/:id", component: UpdateHouseComponent,
  },
  {
    path: "", component: ListHouseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
