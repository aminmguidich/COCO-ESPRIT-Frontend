import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';

import { NotAutorizedComponent } from './not-autorized/not-autorized.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { AllUsersComponent } from './all-users/all-users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ProfileComponent } from './profile/profile.component';






@NgModule({
  declarations: [
  
  
       LoginComponent,
       NotAutorizedComponent,
       UpdateUserComponent,
       VerifyAccountComponent,
       AllUsersComponent,
       EditUserComponent,
       ProfileComponent,
       
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    NgxPaginationModule
    

    
    
  ]
})
export class UserModuleModule { }
