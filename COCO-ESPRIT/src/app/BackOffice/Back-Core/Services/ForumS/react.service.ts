import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ReactPost } from '../../Models/Forum/ReactPost';
import { TypeReactPost } from '../../Models/Forum/TypeReact';

@Injectable({
    providedIn: 'root'
  })
  export class ReactService {
    private _refresh$ = new Subject<void>();
    private piURL = "http://localhost:9092/api/Post" ;
     constructor(private http: HttpClient) { }


   
      retrieveAllReactPost(): Observable<ReactPost[]> {
        return this.http.get<ReactPost[]>(`http://localhost:9092/api/Post/retrieveAllReactPost`);
      }

      getReactsForPost(postId: number): Observable<ReactPost[]> {
        return this.http.get<ReactPost[]>(`http://localhost:9092/api/Post/getReactsForPost/${postId}`);
      }




      getReactsForComment(idComment: number): Observable<ReactPost[]> {
        return this.http.get<ReactPost[]>(`http://localhost:9092/api/Post/getReactsForComment/${idComment}`);
      }


      addTypeReacttoPost(IdPost: number,typereact: TypeReactPost) : Observable<any>{
        return this.http.post(`http://localhost:9092/api/Post/addTypeReacttoPost/${IdPost}`, typereact);
      
      }
      addReactToComment(idcomment: number, typereact: TypeReactPost): Observable<any> {
        return this.http.post(`http://localhost:9092/api/Post/addReactToComment/${idcomment}`, typereact);
      }
      
      

  }