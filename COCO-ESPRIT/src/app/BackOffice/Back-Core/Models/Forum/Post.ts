import { Component } from '@angular/core';
import { CommentPost } from './CommentPost';
import { ReactPost } from './ReactPost';


export class Post { 

 idPost!: number; 
 postTitle: string;
 body: string;
 createdAt:Date;
 nb_Signal:number=0;
 nb_etoil:number=0;
 //image:string;
 image?: string | File; // Change the type to accept both string and File
 idUser: number; // Relation OneToMany sera modifier apre l'integration
 reactPost:[ReactPost];
 commentPosts:[CommentPost];
 

} 