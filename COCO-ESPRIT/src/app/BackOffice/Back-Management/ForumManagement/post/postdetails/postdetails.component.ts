import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { PostService } from 'src/app/BackOffice/Back-Core/Services/ForumS/post.service';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent implements OnInit {
  postId: number;
  post: Post;

  constructor(private route: ActivatedRoute, private postService: PostService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['idPost']; // Get the postId parameter from the route
      this.getPostDetails();
    });
  }

  getPostDetails(): void {
    this.postService.getPost(this.postId).subscribe(post => {
      this.post = post;
    });
  }

}
