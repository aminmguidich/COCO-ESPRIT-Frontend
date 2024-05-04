import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentcollService {

  baseURL = "http://localhost:9092/api/CommentColl/"

  constructor(
    private http:HttpClient
  ) { }


  getAll(){
    return this.http.get(this.baseURL+"allCommentsColl")
  }

  create(data:any){
    return this.http.post(this.baseURL+"addCommentToannooucement",data)
  }

  update(id:any,data:any){
    return this.http.put(this.baseURL+`updateCommentAnn/${id}`,data)
  }

  delete(id:any){
    return this.http.delete(this.baseURL+`${id}`)
  }






}
