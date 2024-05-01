import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AnouncementCarpoolingRoutingModule } from './anouncement-carpooling-routing.module';
import { AddAnnoucementComponent } from './add-annoucement/add-annoucement.component';
import { ListAnnoucementComponent } from './list-annoucement/list-annoucement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableAnnouncementCarpoolingComponent } from './table-announcement-carpooling/table-announcement-carpooling.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AddAnnoucementComponent,
    ListAnnoucementComponent,
    UpdateAnnouncementComponent,
    TableAnnouncementCarpoolingComponent,

  ],
  imports: [
    CommonModule,
    AnouncementCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
     MatSortModule, 
     MatPaginatorModule
    
  ],
  providers:[DatePipe]
})
export class AnouncementCarpoolingModule { }
