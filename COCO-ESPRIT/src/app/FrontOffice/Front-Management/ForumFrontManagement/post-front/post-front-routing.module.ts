import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostFComponent } from './add-post-f/add-post-f.component';
import { ChatComponent } from './chat/chat.component';
import { ListcommentfComponent } from './listcommentf/listcommentf.component';
import { PostFComponent } from './post-f/post-f.component';

const routes: Routes = [
  {path:"", component:PostFComponent},
{path: "AddPostFront",component:AddPostFComponent},
{path: "Listcomment",component:ListcommentfComponent},
{path: "chat/:userId",component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostFrontRoutingModule { }
