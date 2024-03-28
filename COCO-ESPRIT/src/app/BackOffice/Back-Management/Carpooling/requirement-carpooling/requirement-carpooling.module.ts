import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementCarpoolingRoutingModule } from './requirement-carpooling-routing.module';
import { AddRequirementComponent } from './add-requirement/add-requirement.component';
import { ListRequirementComponent } from './list-requirement/list-requirement.component';
import { UpdateRequirementComponent } from './update-requirement/update-requirement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddRequirementComponent,
    ListRequirementComponent,
    UpdateRequirementComponent
  ],
  imports: [
    CommonModule,
    RequirementCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RequirementCarpoolingModule { }
