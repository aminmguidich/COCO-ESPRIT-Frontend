import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reactcol } from '../../Models/Collocation/reactcol';

@Injectable({
  providedIn: 'root'
})
export class ReactcollService {

  private apiURL = 'http://localhost:9092/';

  constructor(private http: HttpClient) { }

  postReactCol(post: Reactcol): Observable<Reactcol> {
    return this.http.post<Reactcol>(`${this.apiURL}React/addReact_Coll`, post);
  }

  retrieveAllReacts(): Observable<Reactcol[]> {
    return this.http.get<Reactcol[]>(`${this.apiURL}all`);
  }

  deleteReact(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  updateReact(id: number, value: any): Observable<object> {
    return this.http.put(`${this.apiURL}update/${id}`, value);
  }
  
  getReactById(id: number): Observable<Reactcol> {
    return this.http.get<Reactcol>(`${this.apiURL}${id}`);
  }

  likePost(idCollocationAnnouncement: number): Observable<any> {
    const url = `http://localhost:9092/api/React/like/${idCollocationAnnouncement}`;
    return this.http.post<any>(url, null);
  }
  dislikePost(idCollocationAnnouncement: number): Observable<any> {
    const url = `http://localhost:9092/api/React/dislike/${idCollocationAnnouncement}`;
    return this.http.post<any>(url, null);}

    getTotalLikesByPostId(idCollocationAnnouncement: number): Observable<number> {
      const url = `http://localhost:9092/api/React/nbrLikesParAnnoucement/${idCollocationAnnouncement}`;
      return this.http.get<number>(url);
    }


    getTotalDislikesByPostId(idCollocationAnnouncement: number): Observable<number> {
      const url = `http://localhost:9092/api/React/nbrDisLikesParAnnoucement/${idCollocationAnnouncement}`;
      return this.http.get<number>(url);
    }







  }
