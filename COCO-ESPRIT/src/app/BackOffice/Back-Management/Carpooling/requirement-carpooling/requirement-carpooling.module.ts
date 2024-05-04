import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequirementCarpoolingRoutingModule } from './requirement-carpooling-routing.module';
import { AddRequirementComponent } from './add-requirement/add-requirement.component';
import { ListRequirementComponent } from './list-requirement/list-requirement.component';
import { UpdateRequirementComponent } from './update-requirement/update-requirement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableRequirementComponent } from './table-requirement/table-requirement.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddRequirementComponent,
    ListRequirementComponent,
    UpdateRequirementComponent,
    TableRequirementComponent
  ],
  imports: [
    CommonModule,
    RequirementCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
  ]
})
export class RequirementCarpoolingModule { }
