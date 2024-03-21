import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/BackOffice/Back-Core/Models/Forum/Post';
import { PostService } from 'src/app/BackOffice/Back-Core/Services/ForumS/post.service';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  myForm!: FormGroup;
  posts: Post = new Post(); 
  selectedFile: File | undefined;



  constructor(private f: FormBuilder,private s: PostService,private router: Router) { 
    
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
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  //path ou l'image : http://localhost:90/COCO/Post/logo.png
onSubmit() {
  let p = new Post();
p.postTitle=this.postTitle.value;
p.body=this.body.value;
p.createdAt = new Date(); // Set current system date
//p.nb_Signal = 0;
//p.nb_etoil = 0;
//p.image = null;
if (this.selectedFile) {
  p.image = this.selectedFile;
}
console.log(this.myForm.value); // Log the entire post object
console.log(this.posts);
this.s.addPost(p).subscribe(()=>this.myForm.reset()); //pour supprimer le continue apres l'ajjout

this.gotoList();
}
gotoList() {
this.router.navigate(['/admin/ListPost']);
}

}
