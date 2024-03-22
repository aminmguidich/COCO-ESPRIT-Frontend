import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of,map,Observable } from 'rxjs';
import { CommentPost } from 'src/app/BackOffice/Back-Core/Models/Forum/CommentPost';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { PostService } from 'src/app/BackOffice/Back-Core/Services/ForumS/post.service';
import * as bootstrap from 'bootstrap';
import { CommentService } from 'src/app/BackOffice/Back-Core/Services/ForumS/comment.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {
  posts: Observable<Post[]>;
  commentList: Observable<CommentPost[]>;

  postsPerPage: number = 4;
  currentPage: number = 1;
  pageSize: number;


  idTodelete: number = 0;
  deleteModal: any;


  constructor(private postService:PostService,private router: Router,private commentService:CommentService) {}

  ngOnInit() {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
    } else {
      console.error("Delete modal element not found.");
    }
    this.reloadData();
  }

  reloadData() {
    this.posts = this.postService.getPostList();
   const startIndex = (this.currentPage - 1) * this.postsPerPage;
    // Fetch only the required number of posts based on the starting index and posts per page
    this.posts = this.postService.getPostList().pipe(
      map(posts => posts.slice(startIndex, startIndex + this.postsPerPage))
    );

    // Determine the total number of posts for pagination
    this.postService.getPostList().subscribe(posts => {
      this.pageSize = Math.ceil(posts.length / this.postsPerPage);
    });
  }
  updatePost(idPost: number){
    this.router.navigate(['update', idPost]);
  }
  
  //deletePost(idPost: number) {
   /* this.postService.deletePost(idPost)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));}*/
  

  deletePost(idPost: number) {
    this.idTodelete = idPost;
    this.deleteModal.show();
  }
 
  delete() {
    this.postService.deletePost(this.idTodelete).subscribe({
      next: () => {
        this.reloadData();
        this.deleteModal.hide();
      },
      error: (error) => {
        console.error('Error deleting post:', error);
        // Handle error, show error message, etc.
      }
    });
  }

  // Function to check if there are comments for a post
  hasComments(postId: number): Observable<boolean> {
    return this.commentService.getCommentsForPost(postId).pipe(
        map(comments => !!comments && comments.length > 0)
    );
}


  
  

  
  
  // Add this property to your component
currentPostIdWithVisibleComments: number | null = null;

commentCounts: { [postId: number]: Observable<number> } = {};

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



 // Method to handle page changes
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.reloadData();
  }
}
