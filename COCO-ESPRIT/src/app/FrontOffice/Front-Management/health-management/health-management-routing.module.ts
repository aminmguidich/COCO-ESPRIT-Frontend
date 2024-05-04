import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { ListCarComponent } from './list-car/list-car.component';

const routes: Routes = [
  {path:"", component:ListCarComponent},
  {path:"AddCar",component:AddCarComponent},
  {path:"BalanceSeet",component:BalanceSheetComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthManagementRoutingModule { }
