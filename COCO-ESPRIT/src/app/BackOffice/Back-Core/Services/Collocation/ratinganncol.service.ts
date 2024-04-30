import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rateanncol } from '../../Models/Collocation/rateanncol';

@Injectable({
  providedIn: 'root'
})
export class RatinganncolService {
  private apiURL = 'http://localhost:9092/';

  constructor(private http: HttpClient) { }

  postRate(post: Rateanncol): Observable<any> {
    return this.http.post(`${this.apiURL}Rating-Collocation/addRatingCollocation`, post);
  }

  retrieveAllRatings(): Observable<any> {
    return this.http.get(`${this.apiURL}Rating-Collocation/all`);
  }

  deleteRate(idCollocationRating: any): Observable<any> {
    return this.http.delete(`${this.apiURL}Rating-Collocation/delete/${idCollocationRating}`);
  }

  updateRate(id: number, newRate: Rateanncol): Observable<any> {
    return this.http.put(`${this.apiURL}Rating-Collocation/updateRatingCollocation/${id}`, newRate);
  }

  getRateById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}Rating-Collocation/${id}`);
  }
}
