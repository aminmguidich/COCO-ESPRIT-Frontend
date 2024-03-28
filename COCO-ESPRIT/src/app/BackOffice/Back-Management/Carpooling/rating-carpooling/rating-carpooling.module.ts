import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingCarpoolingRoutingModule } from './rating-carpooling-routing.module';
import { ListRatingComponent } from './list-rating/list-rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListRatingComponent
  ],
  imports: [
    CommonModule,
    RatingCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RatingCarpoolingModule { }
