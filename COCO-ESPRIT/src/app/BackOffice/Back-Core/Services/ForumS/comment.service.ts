import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private _refresh$ = new Subject<void>();
  private piURL = "http://localhost:9092/api/Post" ;
   constructor(private http: HttpClient) { }
  /******** Comments **********/

  addComment(id: number,post: CommentPost) : Observable<any>{
    return this.http.post(`http://localhost:9092/api/Post/addCommenttoPost/${id}`, post);
  
  }
  addCommentToComment(idComm: number, comment: CommentPost): Observable<any> {
    return this.http.post(`http://localhost:9092/api/Post/addCommentToComment/${idComm}`, comment);
  }
  getCommentList(): Observable<CommentPost[]> {
    return this.http.get<CommentPost[]>("http://localhost:9092/api/Post/retrieveAllCommentPost");
  }

  updateComment(idComment: number, value: any): Observable<Object> {
    return this.http.put("http://localhost:9092/api/Post/updateCommentPost", value);
  }
  getComment(idComment: number): Observable<any> {
    return this.http.get(`http://localhost:9092/api/Post/retrieveCommentPost/${idComment}`);
  }
  deleteComment(idComment: number): Observable<any> {
    return this.http.delete(`http://localhost:9092/api/Post/removeCommentPost/${idComment}`, { responseType: 'text' });
  }
  getCommentsForPost(postId: number): Observable<CommentPost[]> {
    return this.http.get<CommentPost[]>(`http://localhost:9092/api/Post/getCommentsForPost/${postId}`);
  }

  getReplies(commentId: number): Observable<CommentPost[]> {
    return this.http.get<CommentPost[]>(`http://localhost:9092/api/Post/getReplies/${commentId}`);
  }

  findUserCommentPostByIdCommentPost(idCommentPost: number): Observable<string> {
    return this.http.get<string>(`http://localhost:9092/api/Post/findUserCommentPostByIdCommentPost/${idCommentPost}`);
  }

}
