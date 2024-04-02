import { Injectable } from '@angular/core';
import { RequirementCarpooling } from '../../Models/Carpooling/requirement-carpooling';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequirementCarpoolingService {

  URL = "http://localhost:9092/CarpoolingRequirement"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  addReqCarpooling( reqCarpooling: RequirementCarpooling) {
    return this.http.post<RequirementCarpooling>(this.URL+"/addReqCarpooling", reqCarpooling,this.httpOtions)
  }}
