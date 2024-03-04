import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRequirementComponent } from './list-requirement/list-requirement.component';
import { AddRequirementComponent } from './add-requirement/add-requirement.component';
import { UpdateRequirementComponent } from './update-requirement/update-requirement.component';

const routes: Routes = [
  {
    path:"",
    component:ListRequirementComponent
  },
  {
    path:"addReq",
    component:AddRequirementComponent
  },
  {
    path:"updateReq",
    component:UpdateRequirementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequirementCarpoolingRoutingModule { }
