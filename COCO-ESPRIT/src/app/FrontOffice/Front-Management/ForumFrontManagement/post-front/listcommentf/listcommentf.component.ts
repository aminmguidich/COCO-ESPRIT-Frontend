import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable ,map,of} from 'rxjs';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { CommentService } from 'src/app/BackOffice/Back-Core/Services/ForumS/comment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    private route: ActivatedRoute, 
    private commentService:CommentService,
    @Inject(MAT_DIALOG_DATA) public data: { postId: number }
    ) { }

    ngOnInit(): void {
      this.idPost = this.data.postId;
      // Retrieve comments for the post and assign them to commentList
      this.commentService.getCommentsForPost(this.idPost).subscribe(comments => {
        this.commentList = comments;
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

}
