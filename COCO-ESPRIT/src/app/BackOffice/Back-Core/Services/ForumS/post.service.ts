import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { RaitingPost } from '../../Models/Forum/RaitingPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _refresh$ = new Subject<void>();
 private piURL = "http://localhost:9092/api/Post" ;
  constructor(private http: HttpClient) { }
/******** Posts **********/
  addPost(post: Post) : Observable<any>{
    return this.http.post("http://localhost:9092/COCO/addPost", post);
  
  }
  AddWithoutBadWord(post: Post) : Observable<any>{
    return this.http.post("http://localhost:9092/api/Post/AddWithoutBadWord", post,{ responseType: 'text' });
  
  }
  //add user
  /*UserAddWithoutBadWord(post: Post, idUser: number): Observable<any>{
    return this.http.post(`http://localhost:9092/UserAddWithoutBadWord/${idUser}`, post,{ responseType: 'text' });
  }*/

  
  getPostList(): Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:9092/api/Post/retrieveAllPost");
  }
  getMeilleurPost(): Observable<Post> {
    return this.http.get<Post>(`http://localhost:9092/api/Post/MeilleurPost`);
  
  }
  updatePost(idPost: number, value: any): Observable<Object> {
    return this.http.put("http://localhost:9092/api/Post/updatePost", value);
  }
  getPost(idPost: number): Observable<any> {
    return this.http.get(`http://localhost:9092/api/Post/retrievePost/${idPost}`);
  }
  deletePost(idPost: number): Observable<any> {
    return this.http.delete(`http://localhost:9092/api/Post/removePost/${idPost}`, { responseType: 'text' });
  }

  //l9dima

  updatePostRating(postId: number, nb_etoil: number): Observable<any> {
    return this.http.put(`http://localhost:9092/api/Post/updatePostRating/${postId}/${nb_etoil}`, null);

  }
  //new rate
  updatePostRate(postId: number): Observable<any> {
    return this.http.put(`http://localhost:9092/api/Post/updatePostRate/${postId}`, null);

  }
  hasUserRatedPost(postId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:9092/api/Post/hasUserRatedPost/${postId}`);
  }
  addRaitingPost(postId: number, nbStart: number): Observable<RaitingPost> {
    return this.http.post<RaitingPost>(`http://localhost:9092/api/Post/addRaitingPost/${postId}/${nbStart}`, {});
  }


  UpdatereportPost(idPost: number): Observable<any> {
    return this.http.put<void>(`http://localhost:9092/api/Post/reportPost/${idPost}`, {});
  }
  deleteExpiredPosts(): Observable<void> {
    return this.http.delete<void>('http://localhost:9092/api/Post/deletePostByTime', {});
  }

  findUserNameAndLastNameByPostId(postId: number): Observable<string> {
    return this.http.get<string>(`http://localhost:9092/api/Post/findUserNameAndLastNameByPostId/${postId}`);
  }

  
}
