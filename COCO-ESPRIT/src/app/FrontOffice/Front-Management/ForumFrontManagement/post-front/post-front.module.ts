import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostFrontRoutingModule } from './post-front-routing.module';
import { PostFComponent } from './post-f/post-f.component';
import { AddPostFComponent } from './add-post-f/add-post-f.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { AddcommentfComponent } from './addcommentf/addcommentf.component';
import { ListcommentfComponent } from './listcommentf/listcommentf.component';
import { AddReplycommentfComponent } from './add-replycommentf/add-replycommentf.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { RaitingComponent } from './raiting/raiting.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    PostFComponent,
    AddPostFComponent,
    AddcommentfComponent,
    ListcommentfComponent,
    AddReplycommentfComponent,
    RaitingComponent,
    ChatComponent,
    
  ],
  imports: [
    CommonModule,
    PostFrontRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,

  ]
  
})


export class PostFrontModule { }
