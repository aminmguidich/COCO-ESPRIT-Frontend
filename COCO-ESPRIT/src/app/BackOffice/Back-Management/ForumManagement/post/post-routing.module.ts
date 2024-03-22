import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { PostdetailsComponent } from './postdetails/postdetails.component';

const routes: Routes = [
{path:"", component:ListPostComponent},
{path: "AddPost",component:AddPostComponent},
{ path: "detailsPost/:idPost", component: PostdetailsComponent } // Include the idPost parameter

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
