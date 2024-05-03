import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { LoginComponent } from './BackOffice/Back-Management/User/User-module/login/login.component';
import { RegisterComponent } from './BackOffice/Back-Management/User/User-module/register/register.component';
import { ForgotPasswordComponent } from './BackOffice/Back-Management/User/User-module/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './BackOffice/Back-Management/User/User-module/reset-password/reset-password.component';
import { NotAutorizedComponent } from './BackOffice/Back-Management/User/User-module/not-autorized/not-autorized.component';
import { RoleAuthGuard } from './helpers/auth.guard';





import { Role } from './helpers/role';
import { AuthGuard } from './helpers/auth-guard.service';



import { AboutFrontComponent } from './FrontOffice/about-front/about-front.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { BlogFrontComponent } from './FrontOffice/blog-front/blog-front.component';
import { CarsFrontComponent } from './FrontOffice/cars-front/cars-front.component';
import { ContactFrontComponent } from './FrontOffice/contact-front/contact-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { PircingFrontComponent } from './FrontOffice/pircing-front/pircing-front.component';
import { ServicesFrontComponent } from './FrontOffice/services-front/services-front.component';
import { QuizComponent } from './BackOffice/Back-Management/Collocation/annoucement-collocation/quiz/quiz.component';

const routes: Routes = [

  {path:"not-autorized",component:NotAutorizedComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: "quiz/:id", component: QuizComponent,
  },
  {
    path :"",
    component :AllTemplateFrontComponent,
    canActivate: [RoleAuthGuard], data: { expectedRoles: ['ROLE_USER'] } ,
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
        path :"Annoucement",
        loadChildren: () => import('./FrontOffice/Front-Management/Collocation/aanoucement-col/aanoucement-col.module').then(m => m.AannoucementCollModule),
      },

      {
        path:"House",
        loadChildren: () => import('./FrontOffice/Front-Management/Collocation/house/house.module').then(m => m.HouseModule),
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
     /* {
        path:"blog",
        component:BlogFrontComponent
      },*/
      {
        path:"contact",
        component:ContactFrontComponent
      },
      {
        path:"Frontcarpooling/announcement",
        loadChildren:() => import('./FrontOffice/Front-Management/Carpooling/announcement-carpooling/announcement-carpooling.module').then(m => m.AnnouncementCarpoolingModule),
      },
     

    ]
  },
  {
    path:"admin",
    component:AllTemplateBackComponent,
    canActivate: [RoleAuthGuard], data: { expectedRoles: ['ROLE_ADMIN'] },
    
    children:
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
      path:"collocation/announcement",
      loadChildren: () => import('./BackOffice/Back-Management/Collocation/annoucement-collocation/annoucement-collocation.module').then(m => m.AnnoucementCollocationModule),
    },

    

   
    { 
      path:"collocation/house",
      loadChildren: () => import('./BackOffice/Back-Management/Collocation/House/house.module').then(m => m.HouseModule),
    },

    
    

    ]
  },
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
