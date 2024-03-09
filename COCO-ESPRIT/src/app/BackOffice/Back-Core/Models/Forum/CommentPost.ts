import { Component } from '@angular/core';
import { Post } from './Post';
import { ReactPost } from './ReactPost';


export class CommentPost { 

 idCommentPost!: number; 
 commentBody: string;
 commentedAt: Date;
 idUser: number;
 reactPostsComment: ReactPost[]; // Relation OneToMany
 postComments: CommentPost[]; // Relation OneToMany (Reflexive)
 postCo: CommentPost; // Relation ManyToOne (Self-Referencing)
 postComment: Post; // Relation ManyToOne

} 