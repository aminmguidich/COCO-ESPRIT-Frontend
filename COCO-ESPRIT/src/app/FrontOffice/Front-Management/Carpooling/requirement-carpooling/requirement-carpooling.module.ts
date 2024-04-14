import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementCarpoolingRoutingModule } from './requirement-carpooling-routing.module';
import { AddReactComponent } from './add-react/add-react.component';
import { UpdateReactComponent } from './update-react/update-react.component';
import { ListReactComponent } from './list-react/list-react.component';
import { AddRequirementComponent } from './add-requirement/add-requirement.component';
import { UpdateRequirementComponent } from './update-requirement/update-requirement.component';
import { ListRequirementComponent } from './list-requirement/list-requirement.component';


@NgModule({
  declarations: [
    AddReactComponent,
    UpdateReactComponent,
    ListReactComponent,
    AddRequirementComponent,
    UpdateRequirementComponent,
    ListRequirementComponent
  ],
  imports: [
    CommonModule,
    RequirementCarpoolingRoutingModule
  ]
})
export class RequirementCarpoolingModule { }
