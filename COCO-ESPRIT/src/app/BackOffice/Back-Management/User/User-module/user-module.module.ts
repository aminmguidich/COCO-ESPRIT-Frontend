import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';




@NgModule({
  declarations: [
  
    BoardAdminComponent,
       LoginComponent,
       HomeComponent,
       ProfileComponent,
       BoardUserComponent,
       BoardModeratorComponent,
       
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
  ]
})
export class UserModuleModule { }
