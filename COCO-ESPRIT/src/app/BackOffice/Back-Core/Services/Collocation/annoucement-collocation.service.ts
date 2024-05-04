import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnouncementCollocation } from '../../Models/Collocation/annoucement-collocation';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnoucementCollocationService {
  private apiURL = 'http://localhost:9092/api/Collocation_Announcement/';

  constructor(private http: HttpClient) { }

  postAnnoucementCollocation(post: AnnouncementCollocation): Observable<any> {
   
    return this.http.post(`${this.apiURL}addAnnouncementCollocation`, post, );
  }

  retrieveAllAnnouncements(): Observable<any> {
    return this.http.get(`${this.apiURL}allAnnouncements`);
  }

  deleteAnnoucementCollocation(idCollocationAnnouncement: any): Observable<any> {
    return this.http.delete(`${this.apiURL}${idCollocationAnnouncement}`);
  }

  updateAnnoucementCollocation(id: number, newAnnouncement: AnnouncementCollocation): Observable<any> {
    return this.http.put(`${this.apiURL}updateAnnouncementCollocation/${id}`, newAnnouncement);
  }

  getAnnouncementCollocationById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}${id}`);
  }
 
  filterAnnouncements(description: string | undefined, budgetPart: number | undefined, score: number | undefined): Observable<AnnouncementCollocation[]> {
    let params = new HttpParams();
    if (description !== undefined) {
      params = params.append('description', description);
    }
    if (budgetPart !== undefined) {
      params = params.append('budgetPart', budgetPart.toString());
    }
    if (score !== undefined) {
      params = params.append('score', score.toString());
    }
    // Utilisez les paramètres de requête pour effectuer le filtrage côté serveur
    return this.http.get<AnnouncementCollocation[]>(`${this.apiURL}filter`, { params: params });
  }

  sendForm(data: any): Observable<any> {
    // Envoi de l'e-mail à l'URL spécifiée
    return this.http.get(`http://localhost:9092/api/Quiz/sendQuizByEmail/${data.id}/${data.recipientEmaiL}`);
  }


  getUsers(): Observable<any> {
    // Envoi de l'e-mail à l'URL spécifiée
    return this.http.get(`http://localhost:9092/users/all/`);
  }

  updateUsers(data:any,id:any): Observable<any> {
    // Envoi de l'e-mail à l'URL spécifiée
    return this.http.put(`http://localhost:9092/users/update/${id}`,data);
  }
  
  updatePostRating( idCollocationAnnouncement: any, data: any,rateNbr:any) {
    if(rateNbr > data.nb_etoil){
      data.nb_etoil = rateNbr
    }
    console.log(data)
    return this.http.put(`http://localhost:9092/api/Collocation_Announcement/updateAnnouncementCollocation/${idCollocationAnnouncement}`, data);

  }  


  
  
  updateAnnouncementCollocationg( idCollocationAnnouncement: any, data: any): Observable<any> {

    return this.http.put(`http://localhost:9092/api/Collocation_Announcement/updateAnnouncementCollocation/${idCollocationAnnouncement}`, data);

  }  


}
