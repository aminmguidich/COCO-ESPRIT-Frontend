import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReactCarpooling } from '../../Models/Carpooling/react-carpooling';
import { User } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/user';

@Injectable({
  providedIn: 'root'
})
export class ReactCarpoolingService {


  URL = "http://localhost:9092/api/CarpoolingReact"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  getall(){
    return this.http.get<ReactCarpooling[]>(this.URL+"/getAllReactCarpooling");
  }
  getAllUsers(){
    return this.http.get<User[]>("http://localhost:9092/api/CarpoolingAnnouncement/getAllUsers");
  }
}

