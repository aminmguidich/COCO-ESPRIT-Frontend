import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { PhotosService } from 'src/app/BackOffice/Back-Core/Services/ForumS/photos.service';
import { PostService } from 'src/app/BackOffice/Back-Core/Services/ForumS/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  myForm!: FormGroup;
  posts: Post = new Post(); 
  imgUrl: string | ArrayBuffer = 'assets/upload.png';
  file: File | null = null;


  constructor(
    private f: FormBuilder,
    private s: PostService,
    private photoService :PhotosService,
    private router: Router) { 
    
  }

  ngOnInit(): void {
    this.myForm = this.f.group({
      postTitle: ['', [Validators.required, Validators.minLength(7)]],
      body: ['', [Validators.required, Validators.minLength(15)]]
    });
    /*this.myForm= new FormGroup({
      postTitle:new FormControl('', [Validators.required,Validators.minLength(7)]), //required : champ obligatoire 
      body:new FormControl('',[Validators.required,Validators.minLength(15)])
    });*/
  }
  
  get postTitle(){
    return this.myForm.get('postTitle')
  }
  get body(){
    return this.myForm.get('body')
  }


  //path ou l'image : http://localhost:90/COCO/Post/logo.png
onSubmit() {
  let p = new Post();
p.postTitle=this.postTitle.value;
p.body=this.body.value;
p.createdAt = new Date(); // Set current system date
p.image = this.file; // Assign the image file to the 'image' attribute
const title = this.myForm.get('postTitle')?.value;
if (this.file) {
  this.savePhoto(this.file, p);
} else {
  this.addPost(p);
}
/*console.log(this.myForm.value); // Log the entire post object
console.log(this.posts);
this.s.addPost(p).subscribe(()=>this.myForm.reset()); //pour supprimer le continue apres l'ajjout

this.gotoList();*/
}
addPost(post: Post): void {
console.log(post);
  this.s.addPost(post).subscribe(() => {
    this.myForm.reset(); // Reset the form after adding the post
    this.gotoList();
  });
}

gotoList() {
this.router.navigate(['/admin/ListPost']);
}

onFileInput(files: FileList | null): void {
  if (files) {
    this.file = files.item(0);
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = (event) => {
        if (fileReader.result) {
          this.imgUrl = fileReader.result;
        }
      };
    }
  }
}
savePhoto(file: File, post: Post): void {
  const title = this.myForm.get('postTitle')?.value;
  if (title) {
    this.photoService.uploadImage(file, title)
      .subscribe({
        next: (res: string) => { 
          post.image = res;
          this.addPost(post);
          console.log('Image uploaded successfully:', res);
        },
        error: (error: any) => {
          console.error('Error uploading image:', error);
        }
      });
  }
}



}
