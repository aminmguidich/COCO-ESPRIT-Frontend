import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { AboutFrontComponent } from './FrontOffice/about-front/about-front.component';
import { ServicesFrontComponent } from './FrontOffice/services-front/services-front.component';
import { PircingFrontComponent } from './FrontOffice/pircing-front/pircing-front.component';
import { CarsFrontComponent } from './FrontOffice/cars-front/cars-front.component';
import { BlogFrontComponent } from './FrontOffice/blog-front/blog-front.component';
import { ContactFrontComponent } from './FrontOffice/contact-front/contact-front.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AnouncementCarpoolingModule } from './BackOffice/Back-Management/Carpooling/anouncement-carpooling/anouncement-carpooling.module';
import { RequirementCarpoolingModule } from './BackOffice/Back-Management/Carpooling/requirement-carpooling/requirement-carpooling.module';
import { RatingCarpoolingModule } from './BackOffice/Back-Management/Carpooling/rating-carpooling/rating-carpooling.module';
import { ReactCarpoolingModule } from './BackOffice/Back-Management/Carpooling/react-carpooling/react-carpooling.module';
import { UserModuleModule } from './BackOffice/Back-Management/User/User-module/user-module.module';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { RegisterComponent } from './BackOffice/Back-Management/User/User-module/register/register.component';
import { ResetPasswordComponent } from './BackOffice/Back-Management/User/User-module/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './BackOffice/Back-Management/User/User-module/forgot-password/forgot-password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnnouncementCarpoolingModule } from './FrontOffice/Front-Management/Carpooling/announcement-carpooling/announcement-carpooling.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material/core';
import { ListDragAndDropComponent } from './FrontOffice/list-drag-and-drop/list-drag-and-drop.component';
import { MapComponent } from './FrontOffice/map/map.component';
import { MapPositionComponent } from './FrontOffice/map-position/map-position.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeFrontComponent,
    AboutFrontComponent,
    ServicesFrontComponent,
    PircingFrontComponent,
    CarsFrontComponent,
    BlogFrontComponent,
    ContactFrontComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent

   
    
    

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AnouncementCarpoolingModule,
    RequirementCarpoolingModule,
    RatingCarpoolingModule,
    ReactCarpoolingModule,
    FormsModule,
    UserModuleModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    AnnouncementCarpoolingModule,
    BrowserAnimationsModule,
   
    BrowserAnimationsModule,
   
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
