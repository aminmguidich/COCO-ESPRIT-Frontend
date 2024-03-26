import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactPost } from 'src/app/BackOffice/Back-Core/Models/Forum/ReactPost';
import { ReactService } from 'src/app/BackOffice/Back-Core/Services/ForumS/react.service';

@Component({
  selector: 'app-add-react-front',
  templateUrl: './add-react-front.component.html',
  styleUrls: ['./add-react-front.component.css']
})
export class AddReactFrontComponent implements OnInit {

  @Input() idPost: number;
  @Input() currentLikes: number; // Ajout du nombre actuel de likes

  constructor(
    private service: ReactService,
    private router: Router) { }

  ngOnInit() {}

  onSubmit() {
    let r = new ReactPost();
    this.addReacttoPost(this.idPost, r);
    alert('Réaction ajoutée avec succès!');
  }

  addReacttoPost(id: number, react: ReactPost): void {
    this.service.addReacttoPost(id, react).subscribe(() => {
      // Incrémentation du nombre de likes
     // this.currentLikes++;
      // Redirection vers la liste des posts ou autre action nécessaire
      this.gotoList();
    });
  }

  gotoList() {
    this.router.navigate(['/ListPostFront']);
  }
}
