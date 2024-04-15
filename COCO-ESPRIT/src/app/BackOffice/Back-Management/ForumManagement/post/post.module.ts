import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { AddPostComponent } from './add-post/add-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import { PostdetailsComponent } from './postdetails/postdetails.component';


@NgModule({
  declarations: [
    AddPostComponent,
    ListPostComponent,
    PaginationComponent,
    PostdetailsComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ]
})
export class PostModule { }
