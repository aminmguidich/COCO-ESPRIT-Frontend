import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostFrontRoutingModule } from './post-front-routing.module';
import { PostFComponent } from './post-f/post-f.component';
import { AddPostFComponent } from './add-post-f/add-post-f.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PostFComponent,
    AddPostFComponent
  ],
  imports: [
    CommonModule,
    PostFrontRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class PostFrontModule { }
