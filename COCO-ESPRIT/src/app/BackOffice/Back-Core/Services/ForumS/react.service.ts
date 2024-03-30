import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ReactPost } from '../../Models/Forum/ReactPost';
import { TypeReact } from '../../Models/Forum/TypeReact';

@Injectable({
    providedIn: 'root'
  })
  export class ReactService {
    private _refresh$ = new Subject<void>();
    private piURL = "http://localhost:9092/COCO" ;
     constructor(private http: HttpClient) { }


   
      retrieveAllReactPost(): Observable<ReactPost[]> {
        return this.http.get<ReactPost[]>(`http://localhost:9092/COCO/retrieveAllReactPost`);
      }

      getReactsForPost(postId: number): Observable<ReactPost[]> {
        return this.http.get<ReactPost[]>(`http://localhost:9092/COCO/getReactsForPost/${postId}`);
      }

      addTypeReacttoPost(IdPost: number,typereact: TypeReact) : Observable<any>{
        return this.http.post(`http://localhost:9092/COCO/addTypeReacttoPost/${IdPost}`, typereact);
      
      }


      getReactsForComment(idComment: number): Observable<ReactPost[]> {
        return this.http.get<ReactPost[]>(`http://localhost:9092/COCO/getReactsForComment/${idComment}`);
      }


     
      addReactToComment(idcomment: number, typereact: TypeReact): Observable<any> {
        return this.http.post(`http://localhost:9092/COCO/addReactToComment/${idcomment}`, typereact);
      }
      
      

  }