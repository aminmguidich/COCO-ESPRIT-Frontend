import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { CommentService } from 'src/app/BackOffice/Back-Core/Services/ForumS/comment.service';
import { PostService } from 'src/app/BackOffice/Back-Core/Services/ForumS/post.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostFComponent } from '../add-post-f/add-post-f.component';
import { ListcommentfComponent } from '../listcommentf/listcommentf.component';
import { ReactService } from 'src/app/BackOffice/Back-Core/Services/ForumS/react.service';
import { TypeReactPost } from 'src/app/BackOffice/Back-Core/Models/Forum/TypeReact';
import { ReactPost } from 'src/app/BackOffice/Back-Core/Models/Forum/ReactPost';
import { ChatComponent } from '../chat/chat.component';
import { MeilleurPostComponent } from '../meilleur-post/meilleur-post.component';
import { StorageService } from 'src/app/BackOffice/Back-Core/Services/User/_services/storage.service';

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

    userName: { [postId: number]: string } = {}; // Object to store usernames based on postId


// New properties to store reaction counts
reactionCounts: { [postId: number]: { LIKE: number; DISLIKE: number; LOVE: number; ANGRY: number; } } = {};

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private commentService:CommentService,
    private reactService:ReactService,
    private _dialog: MatDialog,
    private router: Router,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
    this.reloadData();
    // Listen to the postAdded event emitted by AddPostFComponent
    this.handlePostAdded();
 
}

/*handleRating(postId: number, rating: number) {
  this.postService.getPost(postId).subscribe({
    next: (postToUpdate) => {
      if (postToUpdate) {
        //const newRating = postToUpdate.nb_etoil + rating;
        
        this.postService.addRaitingPost(postId,rating).subscribe({
          next: () => {
            console.log(postToUpdate.nb_etoil);
            console.log(rating);
          }
        });
      } 
    }
  });
}*/
handleRating(postId: number, rating: number) {
  // Check if the user has already rated the post
  this.postService.hasUserRatedPost(postId).subscribe({
    next: (hasRated) => {
      if (hasRated) {
        console.log("User has already rated this post.");
        // You can handle this case, maybe display a message to the user
      } else {
        // If the user hasn't rated the post, proceed with rating
        this.postService.getPost(postId).subscribe({
          next: (postToUpdate) => {
            if (postToUpdate) {
              this.postService.addRaitingPost(postId, rating).subscribe({
                next: () => {
                  console.log("Rating added successfully.");
                  this.reloadData() ;
                }
              });
            } 
          }
        });
      }
    },
    error: (error) => {
      console.error("An error occurred while checking if user has rated the post:", error);
    }
  });
}



reloadData() {
  // Récupérer la liste des publications
  this.postService.getPostList().subscribe(posts => {
    // Trier les publications dans l'ordre décroissant en fonction de leur date de création
    posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    this.pageSize = Math.ceil(posts.length / this.postsPerPage);
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.posts = of(posts.slice(startIndex, startIndex + this.postsPerPage));

    // Réinitialiser les compteurs de commentaires
    this.commentCounts = {};

    // Réinitialiser les compteurs de réactions
    this.reactionCounts = {};

    // Réinitialiser les noms d'utilisateur
    this.userName = {};

    // Fetch reactions and comments for each post
    posts.forEach(post => {
      // Fetch reactions for the post
      this.reactService.getReactsForPost(post.idPost).subscribe(reactions => {
        const counts = { LIKE: 0, DISLIKE: 0, LOVE: 0, ANGRY: 0 };
        reactions.forEach(reaction => {
          counts[reaction.typeReact]++;
        });
        this.reactionCounts[post.idPost] = counts;
      });

      // Fetch comments for the post
      this.commentService.getCommentsForPost(post.idPost).subscribe(comments => {
        this.commentCounts[post.idPost] = of(comments.length);
      });

      // Fetch username for the post
      this.postService.findUserNameAndLastNameByPostId(post.idPost).subscribe(
        username => {
          this.userName[post.idPost] = username;
        },
        error => {
          console.error('Error occurred while fetching username:', error);
        }
      );

    //  this.updatePostRate(post.idPost);
    });
  });
}

updatePostRate(postId: number): void {
  this.postService.updatePostRate(postId)
    .subscribe();
}

/*reloadData() {
  // Récupérer la liste des publications
  this.postService.getPostList().subscribe(posts => {
    // Trier les publications dans l'ordre décroissant en fonction de leur date de création
    posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    this.pageSize = Math.ceil(posts.length / this.postsPerPage);
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.posts = of(posts.slice(startIndex, startIndex + this.postsPerPage));
  
    // Réinitialiser les compteurs de commentaires
    this.commentCounts = {};

    // Fetch reactions for each post and count occurrences
    posts.forEach(post => {
      this.reactService.getReactsForPost(post.idPost).subscribe(reactions => {
        const counts = { LIKE: 0, DISLIKE: 0, LOVE: 0, ANGRY: 0 };
        reactions.forEach(reaction => {
          counts[reaction.typeReact]++;
        });
        this.reactionCounts[post.idPost] = counts;

        // Obtenir le nombre de commentaires pour chaque publication
        this.commentService.getCommentsForPost(post.idPost).subscribe(comments => {
          this.commentCounts[post.idPost] = of(comments.length);
        });
      });
    });
  });
}*/

  

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
openAddPostForm() {
  const dialogRef = this._dialog.open(AddPostFComponent);
}
//best post
openBestPostForm() {
  const dialogRef = this._dialog.open(MeilleurPostComponent);
}

username: string;


getCurrentUser() {
  return this.storageService.getUser();
}

openChat() {
  this.username = this.getCurrentUser().username;

  this.router.navigate(['/chat', this.username]); // Navigate to '/chat/{username}'
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

      // Ouvrir le dialogue en passant l'ID du post
      const dialogRef = this._dialog.open(ListcommentfComponent, {
        data: { postId: postId }
      });
    } else {
      this.currentPostIdWithVisibleComments = null;
      this.commentCounts[postId] = of(0);
    }
  });
}




  // Méthode pour gérer l'ajout de type de réaction au post
  addTypeReaction(postId: number, type: TypeReactPost): void {
    this.reactService.addTypeReacttoPost(postId, type).subscribe(() => {
      // Mettre à jour les compteurs de réaction
      this.updateReactionCounts(postId);
    });
  }

 /*addReacttoPost(postId: number, reactionType: number): void {
    // Create a ReactPost object with the appropriate reaction type
    const react: ReactPost = { typeReact: reactionType } as ReactPost;

    this.reactService.addReacttoPost(postId, react).subscribe(() => {
        // Update the reaction counts
        this.updateReactionCounts(postId);
    });
}*/
mapNumberToTypeReactPost(value: number): TypeReactPost {
  switch(value) {
    case 0: return TypeReactPost.LIKE;
    case 1: return TypeReactPost.DISLIKE;
    case 2: return TypeReactPost.LOVE;
    case 3: return TypeReactPost.ANGRY;
    default: throw new Error('Invalid reaction type');
  }
}


/*addReacttoPost(postId: number, reactionType: TypeReactPost): void {
  const typeReactPost = this.mapNumberToTypeReactPost(reactionType);

  this.reactService.checkExistingReaction(postId, typeReactPost).subscribe(existingReaction => {
      if (existingReaction) {
      
          console.log('User has reacted before:', existingReaction);
          
              existingReaction.typeReact = reactionType;
              this.reactService.removeReactPost(existingReaction.idReactPost).subscribe(() => {
                  this.updateReactionCounts(postId);
              });
          
      } else {
          const react: ReactPost = { typeReact: reactionType } as ReactPost;
          console.log('User has not reacted before');
          this.reactService.addReacttoPost(postId, react).subscribe(() => {
              this.updateReactionCounts(postId);
          });
      }
  });
}*/

currentReaction: { [postId: number]: number } = {};

getCurrentReactionType(postId: number): number | null {
  // Retrieve the selected reaction type for the specified post ID
  return this.currentReaction[postId] || null;
}


addReacttoPost(postId: number, reactionType: number): void {
  // First, check if the user has already reacted to the post
  this.reactService.countByUserReactPost(postId).subscribe(hasReacted => {
    if (!hasReacted) {
      //this.currentReaction[postId] = reactionType;
     // console.log(this.currentReaction);
      // User has already reacted, so check if the selected reaction type is the same
    //  const currentReactionType = this.getCurrentReactionType(postId);
     // console.log(this.currentReaction);
     // console.log(currentReactionType);
     // if ( currentReactionType === reactionType) {
        // User has selected the same reaction type twice, so remove the reaction
      //  this.removeReact(postId);
      //  this.updateReactionCounts(postId);

      //} else {
        // User has selected a different reaction type, so update the existing reaction
        const react: ReactPost = { typeReact: reactionType } as ReactPost;
        this.reactService.updateReact(postId, react).subscribe(() => {
          // Update the reaction counts
          this.updateReactionCounts(postId);
        });
    //  }
    } else {
      // User hasn't reacted before, so add a new reaction
      const react: ReactPost = { typeReact: reactionType } as ReactPost;
      this.reactService.addReacttoPost(postId, react).subscribe(() => {
        // Update the reaction counts
        this.updateReactionCounts(postId);
      });
    }
  });
}

hasReacted(idPost: number): Observable<boolean> {
  return this.reactService.countByUserReactPost(idPost).pipe(
    map(hasReacted => hasReacted)
  );
}




removeReact(postId: number): void {
  // Implement a method to remove the reaction of the user for the post
  // You can call your existing removeReactPost method from the reactService
  this.reactService.removeReactPost(postId).subscribe(() => {
    // Update the reaction counts
    this.updateReactionCounts(postId);
  });
}

/*addReacttoPost(postId: number, reactionType: number): void {
  // First, check if the user has already reacted to the post
  this.reactService.countByUserReactPost(postId).subscribe(hasReacted => {
      if (hasReacted) {
          // User has already reacted, so update the existing reaction
          const react: ReactPost = { typeReact: reactionType } as ReactPost;
          this.reactService.updateReact(postId, react).subscribe(() => {
              // Update the reaction counts
              this.updateReactionCounts(postId);
          });
      } else {
          // User hasn't reacted before, so add a new reaction
          const react: ReactPost = { typeReact: reactionType } as ReactPost;
          this.reactService.addReacttoPost(postId, react).subscribe(() => {
              // Update the reaction counts
              this.updateReactionCounts(postId);
          });
      }
  });
}*/









// Méthode pour mettre à jour le nombre de réactions après l'ajout de la réaction
updateReactionCounts(postId: number): void {
  this.reactService.getReactsForPost(postId).subscribe(reactions => {
    const counts = { LIKE: 0, DISLIKE: 0, LOVE: 0, ANGRY: 0 };
    reactions.forEach(reaction => {
      counts[reaction.typeReact]++;
    });
    this.reactionCounts[postId] = counts;
  });
}

handlePostAdded() {
  // Appelez reloadData() pour mettre à jour la liste des publications
  this.reloadData();
}
reportPost(postId: number): void {
  this.postService.UpdatereportPost(postId).subscribe({
    next: () => {
      alert('Le post a été signalé avec succès.');
      this.reloadData();
    },
    error: error => {
      console.error('Une erreur s\'est produite lors du signalement du post :', error);
    }
  });
}



}
