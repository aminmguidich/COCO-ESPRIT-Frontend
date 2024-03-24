import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { CommentService } from 'src/app/BackOffice/Back-Core/Services/ForumS/comment.service';
import { PostService } from 'src/app/BackOffice/Back-Core/Services/ForumS/post.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostFComponent } from '../add-post-f/add-post-f.component';

@Component({
  selector: 'app-post-f',
  templateUrl: './post-f.component.html',
  styleUrls: ['./post-f.component.css']
})
export class PostFComponent implements OnInit {
  posts: Observable<Post[]>;

  postId: number;
  post: Post;
  commentList: Observable<CommentPost[]>;
  commentReplies: { [commentId: number]: Observable<CommentPost[]> } = {};
      // retrive comment to post
    currentPostIdWithVisibleComments: number | null = null;
    commentCounts: { [postId: number]: Observable<number> } = {};
    //replay comment
    currentCommentIdWithVisibleComments: number | null = null;
    commentReplayCounts: { [commentId: number]: Observable<number> } = {};


  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private commentService:CommentService,
    private _dialog: MatDialog
    ) { }
  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    // Récupérer la liste des posts
    this.postService.getPostList().subscribe(posts => {
      // Trier les posts dans l'ordre décroissant en fonction de leur date de création
      posts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  
      // Calculer la taille de la page en fonction du nombre total de posts
      this.pageSize = Math.ceil(posts.length / this.postsPerPage);
  
      // Calculer l'index de début pour la pagination
      const startIndex = (this.currentPage - 1) * this.postsPerPage;
  
      // Sélectionner les posts pour la page actuelle
      this.posts = of(posts.slice(startIndex, startIndex + this.postsPerPage));
    });
  }
  

//pagination front
pageSize: number; 
postsPerPage: number = 3;
currentPage: number = 1;
pageChange: EventEmitter<number> = new EventEmitter<number>();


goToPage(pageNumber: number) {
  this.currentPage = pageNumber;
  this.reloadData();
}

//add post
openAddEditEmpForm() {
  const dialogRef = this._dialog.open(AddPostFComponent);
}

get pageSizeArray(): number[] {
  return Array.from({ length: this.pageSize }, (_, i) => i + 1);
}

// Function to check if there are comments for a post
hasComments(postId: number): Observable<boolean> {
  return this.commentService.getCommentsForPost(postId).pipe(
      map(comments => !!comments && comments.length > 0)
  );
}




showComments(postId: number): void {
  this.hasComments(postId).subscribe(hasComments => {
      if (hasComments) {
          this.currentPostIdWithVisibleComments = postId;
          this.commentList = this.commentService.getCommentsForPost(postId);
          this.commentCounts[postId] = this.commentService.getCommentsForPost(postId).pipe(
              map(comments => comments.length)
          );
      } else {
          this.currentPostIdWithVisibleComments = null;
          this.commentCounts[postId] = of(0);
      }
  });
}

hasReplies(commentId: number): Observable<boolean> {
  return this.commentService.getReplies(commentId).pipe(
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
