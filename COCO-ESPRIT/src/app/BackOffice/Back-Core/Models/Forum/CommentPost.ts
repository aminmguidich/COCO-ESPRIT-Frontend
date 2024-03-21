import { Component } from '@angular/core';
import { Post } from './Post';
import { ReactPost } from './ReactPost';


export class CommentPost { 

 idCommentPost!: number; 
 commentBody: string;
 commentedAt: Date;
 idUser: number;
 reactPostsComment: ReactPost[]; // Relation OneToMany
 postCommentsReflexive: CommentPost[]; // Relation OneToMany (Reflexive)
 postCoReflexive: CommentPost; // Relation ManyToOne (Self-Referencing)
 postComment: Post; // Relation ManyToOne

} 