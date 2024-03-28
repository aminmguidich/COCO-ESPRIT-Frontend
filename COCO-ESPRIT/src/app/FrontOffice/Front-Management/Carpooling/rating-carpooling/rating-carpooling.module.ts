import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingCarpoolingRoutingModule } from './rating-carpooling-routing.module';
import { AddRatingComponent } from './add-rating/add-rating.component';


@NgModule({
  declarations: [
    AddRatingComponent
  ],
  imports: [
    CommonModule,
    RatingCarpoolingRoutingModule
  ]
})
export class RatingCarpoolingModule { }
