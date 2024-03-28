import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReactCarpooling } from '../../Models/Carpooling/react-carpooling';

@Injectable({
  providedIn: 'root'
})
export class ReactCarpoolingService {


  URL = "http://localhost:9092/CarpoolingReact"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  getall(){
    return this.http.get<ReactCarpooling[]>(this.URL+"/getAllReactCarpooling");
  }
}

