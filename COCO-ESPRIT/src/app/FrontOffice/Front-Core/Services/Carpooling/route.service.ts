import { Route } from './../../Models/Carpooling/route';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  URL = "http://localhost:9092/api/Route"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  addRoute( route: Route) {
    return this.http.post<Route>(this.URL+"/addRoute", route,this.httpOtions)
  }
  updateRoute(route : Route){
    //let id = foyer.id;
    return this.http.put<Route>(this.URL +"/updateRoute", route,this.httpOtions);
  }
}
