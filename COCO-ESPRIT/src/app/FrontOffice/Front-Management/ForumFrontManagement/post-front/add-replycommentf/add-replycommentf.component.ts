import { Component ,Input,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';
import { CommentService } from 'src/app/BackOffice/Back-Core/Services/ForumS/comment.service';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-replycommentf',
  templateUrl: './add-replycommentf.component.html',
  styleUrls: ['./add-replycommentf.component.css']
})
export class AddReplycommentfComponent implements OnInit {
  myForm!: FormGroup;
  @Input() idComm:number;

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
      c.commentBody = this.commentBody.value;
      c.commentedAt = new Date();
    
      this.addCommentToComment(this.idComm, c);
      this.myForm.reset(); // Réinitialiser le formulaire après l'ajout du commentaire
    } else {
      // Gérer le cas où le formulaire n'est pas valide (champ vide)
      // Par exemple, vous pouvez afficher un message d'erreur à l'utilisateur
      console.log("Le champ de commentaire est vide. Veuillez saisir un commentaire avant de soumettre.");
    }
  }
  

  addCommentToComment(idComm :number,comment: CommentPost): void {

    console.log(comment);
      this.service.addCommentToComment(idComm,comment).subscribe(() => {
        this.gotoList();
      });
    }
    gotoList() {
      this.router.navigate(['/ListPostFront']);
      }

}
