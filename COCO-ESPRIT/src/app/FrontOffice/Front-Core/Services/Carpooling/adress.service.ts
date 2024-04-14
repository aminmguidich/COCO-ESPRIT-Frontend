import { Injectable } from '@angular/core';
import { Adress } from '../../Models/Carpooling/adress';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnnouncementCarpooling } from '../../Models/Carpooling/announcement-carpooling';

@Injectable({
  providedIn: 'root'
})
export class AdressService {
  URL = "http://localhost:9092/Adress"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  addAdress( adress: Adress) {
    return this.http.post<Adress>(this.URL+"/AddAdress", adress,this.httpOtions)
  }

}
