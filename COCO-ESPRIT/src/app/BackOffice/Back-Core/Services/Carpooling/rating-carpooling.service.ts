import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RatingCarpooling } from '../../Models/Carpooling/rating-carpooling';

@Injectable({
  providedIn: 'root'
})
export class RatingCarpoolingService {

  URL = "http://localhost:9092/api/CarpoolingRating"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  getall(){
    return this.http.get<RatingCarpooling[]>(this.URL+"/getAllRatingCarpooling");
  }
}
