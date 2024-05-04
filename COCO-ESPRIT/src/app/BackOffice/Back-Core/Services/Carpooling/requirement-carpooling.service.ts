import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequirementCarpooling } from '../../Models/Carpooling/requirement-carpooling';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/FrontOffice/Front-Core/Models/Carpooling/user';

@Injectable({
  providedIn: 'root'
})
export class RequirementCarpoolingService {

  URL = "http://localhost:9092/api/CarpoolingRequirement"
  constructor(private http:HttpClient) { }
  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }



  AddReqCarpooling( reqCarpooling: RequirementCarpooling) {
    return this.http.post<RequirementCarpooling>(this.URL+"/addReqCarpooling", reqCarpooling,this.httpOtions)


  }
  getall(){
    return this.http.get<RequirementCarpooling[]>(this.URL+"/getAllReqCarpooling");
  }

  updateReqCarpooling(reqCarpooling : RequirementCarpooling){
    //let id = foyer.id;
    return this.http.put(this.URL +"/updateReqCarpooling", reqCarpooling,this.httpOtions);
  }

  getReqCarpoolingById(id:number){
    return this.http.get<RequirementCarpooling>(`${this.URL+"/getByIdReqCarpooling"}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user by ID:', error);
        return throwError(error);
      })
    );
  }

  deleteReqCarpooling(id: number) {
    let URL2 = this.URL + "/deleteReqCarpooling/" + id;
    return this.http.delete<RequirementCarpooling>(URL2,this.httpOtions)
  }

  getAllUsers(){
    return this.http.get<User[]>("http://localhost:9092/api/CarpoolingAnnouncement/getAllUsers");
  }
}
