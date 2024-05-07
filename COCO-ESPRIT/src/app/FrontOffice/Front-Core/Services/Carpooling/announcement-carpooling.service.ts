import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnnouncementCarpooling } from '../../Models/Carpooling/announcement-carpooling';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Adress } from '../../Models/Carpooling/adress';
import { User } from '../../Models/Carpooling/user';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementCarpoolingService {

  URL = "http://localhost:9092/api/CarpoolingAnnouncement"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  private _listners = new Subject<any>();
  listen(): Observable<any> {
   return this._listners.asObservable();
 }
 filter(filterBy:string){
   this._listners.next(filterBy);
 }

  getallPlaces(){
    return this.http.get<AnnouncementCarpooling[]>(this.URL+"/getAllAnnouncementCarpoolingPlaces");
  }

  getAnnCarpoolingById(id:number){
    return this.http.get<AnnouncementCarpooling>(`${this.URL+"/getByIdAnnouncementCarpooling"}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user by ID:', error);
        return throwError(error);
      })
    );
  }
  AddAnnCarpooling( annCarpooling: AnnouncementCarpooling) {
    return this.http.post<AnnouncementCarpooling>(this.URL+"/addAnnCarpooling", annCarpooling,this.httpOtions)
  }
  getAllUsers(){
    return this.http.get<User[]>(this.URL+"/getAllUsers");
  }
  
  deleteAnnCarpooling(id: number) {
    let URL2 = this.URL + "/deleteAnnCarpooling/" + id;
    return this.http.delete<AnnouncementCarpooling>(URL2,this.httpOtions)
  }
  updateAnnCarpooling(annCarpooling : AnnouncementCarpooling){
    //let id = foyer.id;
    return this.http.put(this.URL +"/updateAnnCarpooling", annCarpooling,this.httpOtions);
  }

}
