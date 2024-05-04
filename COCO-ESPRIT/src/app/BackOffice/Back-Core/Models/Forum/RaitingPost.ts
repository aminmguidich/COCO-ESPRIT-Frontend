import { Post } from "./Post";

export interface RaitingPost {
    idRaitongPost: number;
    nbrStars: number;
    postRaiting: Post[]; 
    userRaitingPost: number; 
  }