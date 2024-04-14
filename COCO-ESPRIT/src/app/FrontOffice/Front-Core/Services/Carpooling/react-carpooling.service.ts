import { Injectable } from '@angular/core';
import { ReactCarpooling } from '../../Models/Carpooling/react-carpooling';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReactCarpoolingService {
  deleteReactCarpooling(id:number,announcementId:number) {
    return this.http.delete(this.URL+"/deleteReactCarpooling/"+id+"&"+announcementId)

  }


  URL = "http://localhost:9092/CarpoolingReact"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  addReactCarpooling( reactCarpooling: ReactCarpooling,announcementId:number) {
    return this.http.post<ReactCarpooling>(this.URL+"/addReactCarpooling/"+announcementId, reactCarpooling,this.httpOtions)
  }}