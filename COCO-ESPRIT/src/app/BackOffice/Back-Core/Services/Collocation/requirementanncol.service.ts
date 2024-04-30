import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RequirementCollocation } from '../../Models/Collocation/requirement-ann-coll';

@Injectable({
  providedIn: 'root'
})
export class RequirementanncolService {
  private apiURL = 'http://localhost:9092/';

  constructor(private http: HttpClient) { }

  postReqCol(post: RequirementCollocation): Observable<any> {
    return this.http.post("http://localhost:9092/Collocation_Requirement/addRequirementCollocation", post);
  }

  retrieveAllRequirements(): Observable<any> {
    return this.http.get(this.apiURL + "Collocation_Requirement/allRequirements");
  }

  deleteRequirementCollocationn(idCollocationRequirement: any): Observable<any> {
    return this.http.delete(this.apiURL + `Collocation_Requirement/${idCollocationRequirement}`);
  }

  updateRequirementCollocation(idCollocationRequirementl: number, value: any): Observable<object> {
    return this.http.put(`http://localhost:9092/Collocation_Requirement/updateRequirementCollocation/${idCollocationRequirementl}`, value);
  }
  
  getRequirementCollocationById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}Collocation_Requirement/${id}`);
  }
}
