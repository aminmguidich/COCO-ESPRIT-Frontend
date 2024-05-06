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
  userName: { [postId: number]: string } = {}; // Object to store usernames based on postId


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
    // Réinitialiser les noms d'utilisateur
    this.userName = {};
    
    // Fetch only the required number of posts based on the starting index and posts per page
    this.posts = this.postService.getPostList().pipe(
      map(posts => posts.slice(startIndex, startIndex + this.postsPerPage))
    );

    // Determine the total number of posts for pagination
    this.postService.getPostList().subscribe(posts => {
      this.pageSize = Math.ceil(posts.length / this.postsPerPage);
    });

    // Fetch username for each post
    this.posts.subscribe(posts => {
      posts.forEach(post => {
        this.postService.findUserNameAndLastNameByPostId(post.idPost).subscribe(
          username => {
            this.userName[post.idPost] = username;
          },
          error => {
            console.error('Error occurred while fetching username:', error);
          }
        );
      });
    });

    //recherch
    this.filterPosts();
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

  truncateText(text: string): string {
    if (!text || text.length === 0) {
      return ''; 
    }  
    const words = text.split(' ');  
    const firstThreeWords = words.slice(0, 3).join(' ');  
    if (words.length > 3) {
      return firstThreeWords + '...';
    }
  
    return firstThreeWords; 
  }

  //post expired
  deleteExpiredPosts(): void {
    this.postService.deleteExpiredPosts().subscribe({
      next: () => {
        alert('Publication expired deleted');
      },
      error: (error) => {
        console.error('Error deleting post :', error);
      }
    });
  }

  //recherche ajax
  searchText: string = ''; // Holds the search input text
  filteredPosts: Observable<Post[]>; // Holds the filtered posts

  filterPosts() {
    this.filteredPosts = this.posts.pipe(
      map(posts => {
        if (!this.searchText.trim()) {
          return posts; // If search text is empty, return all posts
        }
        const searchTerm = this.searchText.trim().toLowerCase();
        return posts.filter(post => {
          // Convert numeric values to string and then check for inclusion
          const numericFields = [post.idPost, post.nb_etoil, post.nb_Signal];
          const numericFieldsAsString = numericFields.map(value => value.toString(),post.body);
          const includesNumeric = numericFieldsAsString.some(value => value.includes(searchTerm));
  
          // Check if the post title or body contains the search term
          const includesString = post.postTitle.toLowerCase().includes(searchTerm) ||
                                 post.body.toLowerCase().includes(searchTerm);
  
          return includesNumeric || includesString;
        });
      })
    );
  }
  
  
}