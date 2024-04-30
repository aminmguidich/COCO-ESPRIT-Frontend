import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AannoucementCollRoutingModule } from './aanoucement-col-routing.module';
import { ListannComponent } from './listann/listann.component';
import{PieChartComponentComponent} from'./pie-chart-component/pie-chart-component.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AddanoucecolComponent } from './addanoucecol/addanoucecol.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RaitingComponent } from './raiting/raiting.component';



@NgModule({
  declarations: [
    ListannComponent,
    PieChartComponentComponent,
   
    AddanoucecolComponent,
    RaitingComponent
  ],
  imports: [
    CommonModule,
    AannoucementCollRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    NgxPaginationModule,
   
   
   
    
  ]
})
export class AannoucementCollModule { }
