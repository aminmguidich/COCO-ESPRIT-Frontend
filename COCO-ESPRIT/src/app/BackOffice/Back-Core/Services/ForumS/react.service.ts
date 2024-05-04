import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject } from 'rxjs';
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
      

      //add react
      
      addReacttoPost(IdPost: number,react: ReactPost) : Observable<any>{
        return this.http.post(`http://localhost:9092/api/Post/addReacttoPost/${IdPost}`, react);
      
      }

      removeReactPost(idReactPost: number): Observable<any> {
        return this.http.delete(`http://localhost:9092/api/Post/removeReactPost/${idReactPost}`, { responseType: 'text' });
      }

  
     /* checkExistingReaction(postId: number, reactionType: TypeReactPost): Observable<ReactPost> {
        const url = `http://localhost:9092/api/Post/checkExistingReaction/${postId}/${reactionType}`;
        return this.http.get<ReactPost>(url);
      }*/
      checkExistingReaction(postId: number, reactionType: TypeReactPost): Observable<ReactPost> {
        const reactionTypeValue = TypeReactPost[reactionType]; // Get the string value of the enum member
        const url = `http://localhost:9092/api/Post/checkExistingReaction/${postId}/${reactionTypeValue}`;
        
        return this.http.get<ReactPost>(url).pipe(
          catchError(error => {
            if (error.status === 404) {
              // React not found, handle this case
              console.log('React not found');
              return of(null); // Return null if react not found
            } else {
              // Handle other errors
              console.error('Error:', error);
              throw error;
            }
          })
        );
      }
      
      
      countByUserReactPost(idPost: number): Observable<boolean> {
        return this.http.get<boolean>(`http://localhost:9092/api/Post/countByUserReactPost/${idPost}`);
      }


      updateReact(idPost: number, react: ReactPost): Observable<any> {
    return this.http.put(`http://localhost:9092/api/Post/updateReact/${idPost}`, react);

  }

  }