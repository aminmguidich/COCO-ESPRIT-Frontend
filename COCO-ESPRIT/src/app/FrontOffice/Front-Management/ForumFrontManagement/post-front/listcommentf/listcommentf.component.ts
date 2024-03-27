import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable ,map,of} from 'rxjs';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { CommentService } from 'src/app/BackOffice/Back-Core/Services/ForumS/comment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactService } from 'src/app/BackOffice/Back-Core/Services/ForumS/react.service';
import { TypeReact } from 'src/app/BackOffice/Back-Core/Models/Forum/TypeReact';

@Component({
  selector: 'app-listcommentf',
  templateUrl: './listcommentf.component.html',
  styleUrls: ['./listcommentf.component.css']
})
export class ListcommentfComponent  implements OnInit {
 idPost:number;

  commentList: CommentPost[];
  commentReplies: { [commentId: number]: Observable<CommentPost[]> } = {};
      // retrive comment to post
    currentPostIdWithVisibleComments: number | null = null;
    commentCounts: { [postId: number]: Observable<number> } = {};
    //replay comment
    currentCommentIdWithVisibleComments: number | null = null;
    commentReplayCounts: { [commentId: number]: Observable<number> } = {};
// New properties to store reaction counts
reactionCounts: { [postId: number]: { LIKE: number; DISLIKE: number; LOVE: number; ANGRY: number; } } = {};

  constructor(
    private route: ActivatedRoute, 
    private commentService:CommentService,
    private reactService:ReactService,
    @Inject(MAT_DIALOG_DATA) public data: { postId: number }
    ) { }

    ngOnInit(): void {
      this.idPost = this.data.postId;
      // Retrieve comments for the post and assign them to commentList
      this.commentService.getCommentsForPost(this.idPost).subscribe(comments => {
        this.commentList = comments;

        // Réinitialiser les compteurs de commentaires
    this.commentReplayCounts = {};
        comments.forEach(comment => {
          this.reactService.getReactsForComment(comment.idCommentPost).subscribe(reactions => {
            const counts = { LIKE: 0, DISLIKE: 0, LOVE: 0, ANGRY: 0 };
            reactions.forEach(reaction => {
              counts[reaction.typeReact]++;
            });
            this.reactionCounts[comment.idCommentPost] = counts;  
             // Obtenir le nombre de replies pour chaque commentaire
        this.commentService.getReplies(comment.idCommentPost).subscribe(comments => {
          this.commentReplayCounts[comment.idCommentPost] = of(comments.length);
        });   
          });
        }); // Close the forEach loop here
      });
    }
    

  
  hasReplies(commentId: number): Observable<boolean> {
    return this.commentService.getReplies(commentId).pipe(
        map(comments => !!comments && comments.length > 0)
    );
  }

  
  // Function to check if there are comments for a post
hasComments(postId: number): Observable<boolean> {
  return this.commentService.getCommentsForPost(postId).pipe(
      map(comments => !!comments && comments.length > 0)
  );
}
  // Méthode pour basculer l'état d'affichage des réponses pour un commentaire donné
  showReplies(commentId: number): void {
    this.hasReplies(commentId).subscribe(hasReplies =>{
      if(hasReplies){
  this.currentCommentIdWithVisibleComments = commentId;
  this.commentReplies[commentId] = this.commentService.getReplies(commentId);
  this.commentReplayCounts[commentId] = this.commentService.getReplies(commentId).pipe(
    map(comments => comments.length)
  );
      }else{
        this.currentCommentIdWithVisibleComments = null;
        this.commentReplayCounts[commentId] = of(0);
      }
    })
  }


  //pagination
      // Propriétés pour la pagination
      currentPage: number = 1;
      itemsPerPage: number = 2;
  
      // Méthode pour paginer la liste de commentaires
      get paginatedCommentList() {
        if (this.commentList) {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.commentList.slice(startIndex, endIndex);
        } else {
            return [];
        }
    }
    
  
      // Méthode pour générer les numéros de page
      getPageNumbers() {
        if (this.commentList) {
            const totalPages = Math.ceil(this.commentList.length / this.itemsPerPage);
            return Array(totalPages).fill(0).map((x, i) => i + 1);
        } else {
            return [];
        }
    }
    
      // Méthode pour définir la page actuelle
      setCurrentPage(pageNumber: number) {
          this.currentPage = pageNumber;
      }

      addTypeReaction(commentId: number, type: TypeReact): void {
        if (commentId) {
          this.reactService.addReactToComment(commentId, type).subscribe(() => {
            // Update the reaction counts after adding the reaction
            this.updateReactionCounts(commentId);
          });
        } 
      }
      
      
updateReactionCounts(commentId: number): void {
  this.reactService.getReactsForComment(commentId).subscribe(reactions => {
    const counts = { LIKE: 0, DISLIKE: 0, LOVE: 0, ANGRY: 0 };
    reactions.forEach(reaction => {
      counts[reaction.typeReact]++;
    });
    this.reactionCounts[commentId] = counts;
  });
}
}
