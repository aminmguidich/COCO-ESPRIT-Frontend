import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginationInstance } from 'ngx-pagination';
import { map, startWith } from 'rxjs';
import { TypeReact } from 'src/app/BackOffice/Back-Core/Enum/type-react';
import { AnnouncementCollocation } from 'src/app/BackOffice/Back-Core/Models/Collocation/annoucement-collocation';
import { Reactcol } from 'src/app/BackOffice/Back-Core/Models/Collocation/reactcol';
import { AnnoucementCollocationService } from 'src/app/BackOffice/Back-Core/Services/Collocation/annoucement-collocation.service';
import { CommentcollService } from 'src/app/BackOffice/Back-Core/Services/Collocation/commentcoll.service';
import { ReactcollService } from 'src/app/BackOffice/Back-Core/Services/Collocation/reactcoll.service';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';

@Component({
  selector: 'app-listann',
  templateUrl: './listann.component.html',
  styleUrls: ['./listann.component.css']
})
export class ListannComponent implements OnInit {
  likeCounts: any = {};
  indice: number = 0;
  annoucementscol: any = [];
  description: string = '';
  budgetPart: number | undefined;
  score: number | undefined;
  roommateEmail: string = '';
  comment: string = '';
  comments:any = [];
  showReplyField: number | null = null;
  newReply: string = '';
  newText: string = '';
  editingCommentIndex: number | null = null;
  editedComment: string = '';
  p: number = 1;
  itemsPerPage: number = 3;

  newAnnouncement: { description: string, budgetPart: number, score: number } = { description: '', budgetPart: 0, score: 0 };
  selectedDate: Date = new Date();
  @ViewChild('addAnnouncementModal') addAnnouncementModal!: ElementRef;

  // Utilisateur de la colocation
  userAnnCollocation: any = {
    id: 1,
    fullname: 'User Fullname',
    email: 'user@example.com',
    // Autres propriétés de l'utilisateur...
  };

  userReacts: any = []
  userId: any;

  totalReactAnn: any = []

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: any

  constructor(
    private Annoucementservice: AnnoucementCollocationService,
    private reactCollService: ReactcollService,
    private userService: UserService,
    private http:HttpClient,
    private commentService:CommentcollService
  ) { }


  retrieveAllAnnouncements() {
    this.annoucementscol = []
    this.Annoucementservice.retrieveAllAnnouncements().subscribe((res: any[]) => {
      console.log("annoncement =========>",res);
      this.annoucementscol = res;
    });
  }

  deleteAnnouncementCollocation(idCollocationAnnouncement: any) {
    this.Annoucementservice.deleteAnnoucementCollocation(idCollocationAnnouncement).subscribe(
      (res) => {
        console.log(res);
        this.loadComments();
      },
      (error) => {
        console.error('Error while deleting announcement:', error);
      }
    );
  }

  filterAnnouncements() {
    if (this.description.trim() || this.budgetPart !== undefined || this.score !== undefined) {
      this.Annoucementservice.filterAnnouncements(this.description, this.budgetPart, this.score).subscribe(
        (res) => {
          this.annoucementscol = res;
        },
        (error) => {
          console.error('Error while filtering announcements:', error);
        }
      );
    } else {
      this.retrieveAllAnnouncements();
    }
  }

  sendEmail(user:any) {

    // this.Annoucementservice.getUsers().subscribe((res:any)=>{

    //   const usersList = res

    //   for (let i = 0; i < usersList.length; i++) {

    //     const score = usersList[i].score

    //   }

    // })

    const request = {
      id: user.id,
      recipientEmaiL: user.email
    }

    this.Annoucementservice.sendForm(request).subscribe(
      (response) => {
        alert("email sended")
        console.log('Email sent successfully:', response);
      },
      (error) => {
        alert("email sended")
        console.error('Error sending email:', error);
      }
    );
  }

  getAllComments(){
    this.comments = []
    this.commentService.getAll().subscribe((res:any)=>{

      this.comments = res

      console.log("comments",this.comments)

    })

  }

  submitComment(commentAddInput:any) {
    if (commentAddInput.value !== '') {

      this.http.get("http://localhost:9092/api/user/retrieve/"+this.userId).subscribe((res:any)=>{

        const request = {
          idUser:this.userId,
          username:res.username,
          comment:commentAddInput.value
        }

        this.commentService.create(request).subscribe((res:any)=>{

          console.log(res)

          this.getAllComments()

        })


      })
    } else {
      alert('Please enter a comment.');
    }
  }

  toggleReplyForm(index: number): void {
    if (this.comments[index].replies.length > 0) {
      this.showReplyField = (this.showReplyField === index) ? null : index;
    } else {
      this.showReplyField = index;
    }
  }

  submitReply(comment: any, index: number): void {
    if (this.newReply.trim() !== '') {
      comment.replies.push({ text: this.newReply });
      this.newReply = '';
      this.showReplyField = null;
      localStorage.setItem('comments', JSON.stringify(this.comments));
    } else {
      console.error('Please enter a reply.');
    }
  }

  deleteComment(index: number): void {
    this.commentService.delete(index).subscribe((res:any)=>{

      this.getAllComments()

    })
  }

  editComment(index: number, newText: string): void {
    this.editingCommentIndex = index;
    this.editedComment = this.comments[index].text;
  }

  commentSelectedToUpdate:any
  commentToUpdatevalue = ""
  saveEditedComment(commentInput:any): void {
    if (commentInput.value !== '') {
      this.commentService.update(this.commentSelectedToUpdate.idComment,{comment:commentInput.value}).subscribe((res:any)=>{

        console.log(res)
        this.getAllComments()

      })
    } else {
      console.error('Please enter a valid comment.');
    }
  }



  /*
    handleRating(postId: number, rating: number) {
      this.postService.getPost(postId).subscribe({
        next: (postToUpdate) => {
          if (postToUpdate) {
            const newRating = postToUpdate.nb_etoil + rating;
            
            this.postService.updatePostRating(postId, newRating).subscribe({
              next: () => {
                console.log(postToUpdate.nb_etoil);
                console.log(rating);
              }
            });
          } 
        }
      });
    }
    */

  cancelEditComment(): void {
    this.editingCommentIndex = null;
    this.editedComment = '';
  }

  loadComments() {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
    }
  }



  handleRating(idCollocationAnnouncement: number) {

    // Appeler getAnnouncementCollocationById avec l'ID approprié
    localStorage.setItem("annId", idCollocationAnnouncement + "")

  }

  maxRaitingAryy: any = [];
  SelectedStar = 0;

  findedUsersForEmail:any = []

  filterUserToEmail(emailInput:any){

    var usersFinded:any = []

    for (let i = 0; i < this.users.length; i++) {
      
      const emailIpt = emailInput.target.value.toLowerCase()

      if(this.users[i].email.includes(emailIpt)){
        usersFinded.push(this.users[i])
      }
      
    }

    this.findedUsersForEmail = usersFinded

  }


  rate(rateNbr: any, itemIndex: any, annId: any) {


    this.Annoucementservice.updatePostRating(parseInt(annId), this.annoucementscol[itemIndex],rateNbr).subscribe({
      next: (res:any) => {
        this.annoucementscol[itemIndex].nb_etoil = rateNbr
 
        console.log(res)
      }
    });

  }

  react(action: string, likes: any, dislikes: any, index: any, annId: any) {
    // this.posts[index].like = status

    // var request = {
    //   likes: false,
    //   dislikes: false
    // }

    // if (action === "like") {
    //   request.likes = true
    // } else if (action === "no_like") {
    //   request.likes = false
    // } else if (action === "dislike") {
    //   request.dislikes = true
    // } else if (action === "no_dislike") {
    //   request.dislikes = false
    // }

    if (action === "like") {
      this.sendUserReact(this.userId, annId, true, null)
    } else if (action === "no_like") {
      this.sendUserReact(this.userId, annId, false, null)
    } else if (action === "dislike") {
      this.sendUserReact(this.userId, annId, null, true)
    } else if (action === "no_dislike") {
      this.sendUserReact(this.userId, annId, null, false)
    }

    // console.log()

    // this.Annoucementservice.updateAnnouncementCollocationg(annId, this.annoucementscol[index]).subscribe({

    //   next: (res: any) => {

    //     console.log(res)



    //   }
    // })
  }

  getAllReacts() {

    this.totalReactAnn = []

    console.log(this.totalReactAnn)

    this.reactCollService.getAllReacts().subscribe((res: any) => {

      this.userReacts = res

      // calcul likes & dislikes / ann

      for (let i = 0; i < this.annoucementscol.length; i++) {

        var likes = 0

        var dislikes = 0

        for (let j = 0; j < res.length; j++) {

          if (res[j].idAnn === this.annoucementscol[i].idCollocationAnnouncement) {
            console.log(res[j])
            if (res[j].likes) {
              likes++
            }

            if (res[j].dislikes) {
              dislikes++
            }
          }

        }

        this.totalReactAnn.push({
          likes: likes,
          dislikes: dislikes
        })

      }

      console.log(this.totalReactAnn)

    })

  }

  sendUserReact(idUser: any, idAnn: any, likes: any, dislikes: any) {

    this.reactCollService.getAllReacts().subscribe((res: any) => {

      var trouv = false

      var index = 0

      this.userReacts = res

      for (let i = 0; i < this.userReacts.length; i++) {


        if (this.userReacts[i].idAnn === idAnn && this.userReacts[i].idUser === idUser) {

          trouv = true

          index = i

        }


      }

      if (trouv) {
        this.reactCollService.updateReact(this.userReacts[index].idReact, {
          idAnn: this.userReacts[index].idAnn,
          idUser: this.userReacts[index].idUser,
          likes: likes != null ? likes : false,
          dislikes: dislikes != null ? dislikes : false
        }).subscribe((res: any) => {

          this.userReacts[index].likes = likes != null ? likes : this.userReacts[index].likes
          this.userReacts[index].dislikes = dislikes != null ? dislikes : this.userReacts[index].dislikes

          this.getAllReacts()

        })

      } else {
        this.reactCollService.postReactCol({
          idAnn: 8,
          idUser: parseInt(localStorage.getItem("idUser") + ""),
          likes: likes != null ? likes : false,
          dislikes: dislikes != null ? dislikes : false
        }).subscribe((res: any) => {

          this.userReacts[index].likes = likes != null ? likes : this.userReacts[index].likes
          this.userReacts[index].dislikes = dislikes != null ? dislikes : this.userReacts[index].dislikes

          this.getAllReacts()
        })
      }

    })



  }


  allUsers: any = []

  users:any = []

  _filter(name: string) {
    const filterValue = name.toLowerCase();

    return this.options.filter((option:any) => option.username.toLowerCase().indexOf(filterValue) === 0);
  }

  getAllUsers() {

    this.http.get("http://localhost:9092/api/user/all").subscribe((res:any)=>{
      console.log(res)
      this.users = res
      this.allUsers = res
      this.allUsers = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value:any) => typeof value === 'string' ? value : value.username),
        map(name => name ? this._filter(name) : this.options.slice())
      );

    })



  }

  ngOnInit() {

    this.userId = parseInt(localStorage.getItem("idUser") + "")

    this.getAllReacts()

    this.getAllUsers()

    this.getAllComments()

    this.retrieveAllAnnouncements();


  }

}
