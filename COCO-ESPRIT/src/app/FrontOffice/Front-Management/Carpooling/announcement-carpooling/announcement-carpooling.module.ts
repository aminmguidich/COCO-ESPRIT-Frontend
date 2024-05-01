import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AnnouncementCarpoolingRoutingModule } from './announcement-carpooling-routing.module';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { ListAnnouncementComponent } from './list-announcement/list-announcement.component';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {CDK_DRAG_CONFIG, DragDropModule} from '@angular/cdk/drag-drop';
import { DeteailsAnnouncementComponent } from './deteails-announcement/deteails-announcement.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { SetLocationComponent } from './set-location/set-location.component';







@NgModule({
  declarations: [
    AddAnnouncementComponent,
    ListAnnouncementComponent,
    UpdateAnnouncementComponent,
    PaginatorComponent,
    //ListDragAndDropComponent,
    //MapContainerComponent,
    //MapComponent,
    //MapPositionComponent,
    DeteailsAnnouncementComponent,
    SetLocationComponent,



    
  ],
  imports: [
    CommonModule,
    AnnouncementCarpoolingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatNativeDateModule,
    //DragDropModule ,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    SharedModule
  ],
  providers:[DatePipe]

})
export class AnnouncementCarpoolingModule { }
