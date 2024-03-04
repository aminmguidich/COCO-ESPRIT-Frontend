import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactCarpoolingRoutingModule } from './react-carpooling-routing.module';
import { ListReactComponent } from './list-react/list-react.component';


@NgModule({
  declarations: [
    ListReactComponent
  ],
  imports: [
    CommonModule,
    ReactCarpoolingRoutingModule
  ]
})
export class ReactCarpoolingModule { }
