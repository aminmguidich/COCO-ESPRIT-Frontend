import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';

import { ListHouseComponent } from './list-house/list-house.component';
import { AddHouseComponent } from './add-house/add-house.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateHouseComponent } from 'src/app/BackOffice/Back-Management/Collocation/House/update-house/update-house.component';


@NgModule({
  declarations: [
    UpdateHouseComponent,
    ListHouseComponent,
         AddHouseComponent,
        
  ],
  imports: [
    CommonModule,
    HouseRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class HouseModule { }
