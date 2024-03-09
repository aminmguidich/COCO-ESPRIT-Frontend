import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AboutFrontComponent } from './FrontOffice/about-front/about-front.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { BlogFrontComponent } from './FrontOffice/blog-front/blog-front.component';
import { CarsFrontComponent } from './FrontOffice/cars-front/cars-front.component';
import { ContactFrontComponent } from './FrontOffice/contact-front/contact-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { PircingFrontComponent } from './FrontOffice/pircing-front/pircing-front.component';
import { ServicesFrontComponent } from './FrontOffice/services-front/services-front.component';

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
     /* {
        path: "ListPost",
        loadChildren: () => import('./FrontOffice/ForumFront/PostFrontModule.module').then(m => m.PostFrontModule),
    },*/

    ]
  },
  {
    path:"admin",
    component:AllTemplateBackComponent,children:
    [
      { 
        path:"carpooling/announcement",
        loadChildren: () => import('./BackOffice/Back-Management/Carpooling/anouncement-carpooling/anouncement-carpooling.module').then(m => m.AnouncementCarpoolingModule),

      },
      { 
        path:"carpooling/requirement",
        loadChildren: () => import('./BackOffice/Back-Management/Carpooling/requirement-carpooling/requirement-carpooling.module').then(m => m.RequirementCarpoolingModule),

      },
      { 
        path:"carpooling/rating",
        loadChildren: () => import('./BackOffice/Back-Management/Carpooling/rating-carpooling/rating-carpooling.module').then(m => m.RatingCarpoolingModule),

      },
      { 
        path:"carpooling/react",
        loadChildren: () => import('./BackOffice/Back-Management/Carpooling/react-carpooling/react-carpooling.module').then(m => m.ReactCarpoolingModule),

      },
     {
        path: "ListPost",
        loadChildren: () => import('./BackOffice/Back-Management/ForumManagement/post/post.module').then(m => m.PostModule),
    },
    
    
    

    ]
  }


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
