import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementCarpoolingRoutingModule } from './announcement-carpooling-routing.module';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { ListAnnouncementComponent } from './list-announcement/list-announcement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AddAnnouncementComponent,
    ListAnnouncementComponent,
    UpdateAnnouncementComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    AnnouncementCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatNativeDateModule,
  ]
})
export class AnnouncementCarpoolingModule { }
