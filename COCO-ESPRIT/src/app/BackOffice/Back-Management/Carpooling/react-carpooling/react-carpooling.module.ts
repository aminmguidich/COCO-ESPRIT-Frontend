import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactCarpoolingRoutingModule } from './react-carpooling-routing.module';
import { ListReactComponent } from './list-react/list-react.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListReactComponent,
  ],
  imports: [
    CommonModule,
    ReactCarpoolingRoutingModule,
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
export class ReactCarpoolingModule { }
