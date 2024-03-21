import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { PostModule } from './BackOffice/Back-Management/ForumManagement/post/post.module';
import { PostFrontModule } from './FrontOffice/Front-Management/ForumFrontManagement/post-front/post-front.module';


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
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AnouncementCarpoolingModule,
    RequirementCarpoolingModule,
    RatingCarpoolingModule,
    ReactCarpoolingModule,
    PostModule,
    PostFrontModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
