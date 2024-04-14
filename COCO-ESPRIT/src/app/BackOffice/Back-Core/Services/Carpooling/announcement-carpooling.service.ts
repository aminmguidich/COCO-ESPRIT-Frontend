import { Injectable } from '@angular/core';
import { AnnouncementCarpooling } from '../../Models/Carpooling/announcement-carpooling';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementCarpoolingService {

  
  URL = "http://localhost:9092/CarpoolingAnnouncement"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }


  AddAnnCarpooling( annCarpooling: AnnouncementCarpooling) {
    return this.http.post<AnnouncementCarpooling>(this.URL+"/addAnnCarpooling", annCarpooling,this.httpOtions)


  }
  getall(){
    return this.http.get<AnnouncementCarpooling[]>(this.URL+"/getAllAnnouncementCarpooling");
  }
  updateAnnCarpooling(annCarpooling : AnnouncementCarpooling){
    //let id = foyer.id;
    return this.http.put(this.URL +"/updateAnnCarpooling", annCarpooling,this.httpOtions);
  }
  getAnnCarpoolingById(id:number){
    return this.http.get<AnnouncementCarpooling>(`${this.URL+"/getByIdAnnouncementCarpooling"}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user by ID:', error);
        return throwError(error);
      })
    );
  }
  deleteAnnCarpooling(id: number) {
    let URL2 = this.URL + "/deleteAnnCarpooling/" + id;
    return this.http.delete<AnnouncementCarpooling>(URL2,this.httpOtions)
  }
  
}
