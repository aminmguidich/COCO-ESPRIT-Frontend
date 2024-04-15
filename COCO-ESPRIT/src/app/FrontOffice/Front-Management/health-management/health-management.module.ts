import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthManagementRoutingModule } from './health-management-routing.module';
import { AddCarComponent } from './add-car/add-car.component';
import { ListCarComponent } from './list-car/list-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { CarDetailsComponent } from './car-details/car-details.component';

@NgModule({
  declarations: [
    AddCarComponent,
    ListCarComponent,
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    HealthManagementRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    
  ]
})
export class HealthManagementModule { }
