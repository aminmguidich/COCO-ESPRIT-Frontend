import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reactcol } from '../../Models/Collocation/reactcol';

@Injectable({
  providedIn: 'root'
})
export class ReactcollService {

  private apiURL = 'http://localhost:9092/api/React/';

  constructor(private http: HttpClient) { }

  postReactCol(post:any){
    return this.http.post(`${this.apiURL}addReact_Coll`, post);
  }

  retrieveAllReactsByUserId(){
    return this.http.get(`${this.apiURL}all`);
  }

  deleteReact(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}delete/${id}`);
  }

  updateReact(id: number, data:any){
    return this.http.put(`${this.apiURL}update/${id}`, data);
  }
  
  }
