import { Component ,Input,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';
import { CommentService } from 'src/app/BackOffice/Back-Core/Services/ForumS/comment.service';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcommentf',
  templateUrl: './addcommentf.component.html',
  styleUrls: ['./addcommentf.component.css']
})
export class AddcommentfComponent implements OnInit {
  myForm!: FormGroup;
  @Input() idPost:number;

  constructor(
    private service: CommentService,
    private router: Router) { 
    
  }
  ngOnInit(){
    this.myForm= new FormGroup(
      {commentBody:new FormControl('', Validators.required  )
    }
        );  
  }
  get commentBody(){
    return this.myForm.get('commentBody')
  }

  onSubmit() {
    if (this.myForm.valid) { // Vérifier si le formulaire est valide

    let c = new CommentPost();
  c.commentBody=this.commentBody.value;
  c.commentedAt = new Date();
 
    this.addComment(this.idPost,c);
        this.myForm.reset(); // Reset the form after adding the post
        alert('Commentaire ajouté avec succès!');

      } else {
        
        console.log("Le champ de commentaire est vide. Veuillez saisir un commentaire avant de soumettre.");
      }
  }

  addComment(id :number,comment: CommentPost): void {

    console.log(comment);
      this.service.addComment(id,comment).subscribe(() => {
        this.gotoList();
      });
    }
    gotoList() {
      this.router.navigate(['/ListPostFront']);
      }
      
}
