import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactRoutingModule } from './react-routing.module';
import { ListReactComponent } from './list-react/list-react.component';
import { AddReactComponent } from './add-react/add-react.component';
import { EditReactComponent } from './edit-react/edit-react.component';


@NgModule({
  declarations: [
    ListReactComponent,
    AddReactComponent,
    EditReactComponent
  ],
  imports: [
    CommonModule,
    ReactRoutingModule
  ]
})
export class ReactModule { }
