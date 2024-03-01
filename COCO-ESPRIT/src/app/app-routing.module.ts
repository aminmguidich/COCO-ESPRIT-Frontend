import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { AboutFrontComponent } from './FrontOffice/about-front/about-front.component';
import { ServicesFrontComponent } from './FrontOffice/services-front/services-front.component';
import { PircingFrontComponent } from './FrontOffice/pircing-front/pircing-front.component';
import { CarsFrontComponent } from './FrontOffice/cars-front/cars-front.component';
import { BlogFrontComponent } from './FrontOffice/blog-front/blog-front.component';
import { ContactFrontComponent } from './FrontOffice/contact-front/contact-front.component';

const routes: Routes = [
  {
    
    path :"",
    component :AllTemplateFrontComponent,
    children:[
      {
        path:"home",
        component:HomeFrontComponent
      },
      {
        path :"about",
        component:AboutFrontComponent
      },
      {
        path :"services",
        component:ServicesFrontComponent
      },
      {
        path:"pircing",
        component:PircingFrontComponent
      },
      {
        path:"cars",
        component:CarsFrontComponent
      },
      {
        path:"blog",
        component:BlogFrontComponent
      },
      {
        path:"contact",
        component:ContactFrontComponent
      },

    ]
  },
  {path :"admin",
component :AllTemplateBackComponent
  }


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
