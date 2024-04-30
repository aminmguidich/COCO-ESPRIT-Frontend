import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { TypeReact } from 'src/app/BackOffice/Back-Core/Enum/type-react';
import { AnnouncementCollocation } from 'src/app/BackOffice/Back-Core/Models/Collocation/annoucement-collocation';
import { Reactcol } from 'src/app/BackOffice/Back-Core/Models/Collocation/reactcol';
import { AnnoucementCollocationService } from 'src/app/BackOffice/Back-Core/Services/Collocation/annoucement-collocation.service';
import { ReactcollService } from 'src/app/BackOffice/Back-Core/Services/Collocation/reactcoll.service';

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
  comments: { text: string, replies: { text: string }[] }[] = [];
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

  constructor(
    private Annoucementservice: AnnoucementCollocationService,
    private reactCollService: ReactcollService
  ) { }


  getAllReactsForUserConnected() {

    this.reactCollService.retrieveAllReactsByUserId().subscribe((res: any) => {

      this.userReacts = res

    })

  }

  retrieveAllAnnouncements() {
    this.Annoucementservice.retrieveAllAnnouncements().subscribe((res: any[]) => {
      console.log(res);
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

  sendEmail() {

    // this.Annoucementservice.getUsers().subscribe((res:any)=>{

    //   const usersList = res

    //   for (let i = 0; i < usersList.length; i++) {

    //     const score = usersList[i].score

    //   }

    // })

    if (this.roommateEmail.trim() !== '') {

      const request = {
        id: 1,
        recipientEmaiL: this.roommateEmail
      }

      this.Annoucementservice.sendForm(request).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
    } else {
      console.error('Email is required.');
    }
  }

  submitComment() {
    if (this.comment.trim() !== '') {
      this.comments.push({ text: this.comment, replies: [] });
      localStorage.setItem('comments', JSON.stringify(this.comments));
      this.comment = '';
    } else {
      console.error('Please enter a comment.');
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
    this.comments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  editComment(index: number, newText: string): void {
    this.editingCommentIndex = index;
    this.editedComment = this.comments[index].text;
  }

  saveEditedComment(): void {
    if (this.editedComment.trim() !== '') {
      if (this.editingCommentIndex !== null) {
        this.comments[this.editingCommentIndex].text = this.editedComment;
        this.editingCommentIndex = null;
        this.editedComment = '';
        localStorage.setItem('comments', JSON.stringify(this.comments));
      }
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


  Raiting(index: number) {

    var rateNbr = index + 1

    if (rateNbr > this.SelectedStar) {
      this.SelectedStar = rateNbr;
      var annId: any


      setTimeout(() => {
        if (annId !== null) {
          annId = localStorage.getItem("annId")
        }

        this.Annoucementservice.updatePostRating(parseInt(annId), rateNbr).subscribe({
          next: () => {
            alert("rated")
          }
        });
      }, 4000);
    } else {
      this.SelectedStar = rateNbr;
      var annId: any

      setTimeout(() => {
        if (annId !== null) {
          annId = localStorage.getItem("annId")
        }

        this.Annoucementservice.updatePostRating(parseInt(annId), rateNbr).subscribe({
          next: () => {
            alert("rated")
          }
        });
      }, 4000);
    }



  }



  rate(rateNbr: any, itemIndex: any, annId: any) {



    this.Annoucementservice.updatePostRating(parseInt(annId), rateNbr).subscribe({
      next: () => {
        this.annoucementscol[itemIndex].nb_etoil = rateNbr
      }
    });

  }

  react(action: string, likes: any, dislikes: any, index: any, annId: any) {
    // this.posts[index].like = status

    var request = {
      likes: likes,
      dislikes: dislikes
    }

    if (action === "like") {
      request.likes++
    } else if (action === "no_like") {
      request.likes = request.likes > 0 ? request.likes-- : request.likes
    } else if (action === "dislike") {
      request.dislikes++
    } else if (action === "no_dislike") {
      request.dislikes = request.dislikes > 0 ? request.dislikes-- : request.dislikes
    }


    this.annoucementscol[index].likes = request.likes
    this.annoucementscol[index].dislikes = request.dislikes

    console.log(this.annoucementscol[index])

    this.Annoucementservice.updateAnnouncementCollocationg(annId, this.annoucementscol[index]).subscribe({

      next: (res:any) => {

        console.log(res)
        
        // if (action === "like") {
        //   this.sendUserReact(this.userId,annId,true,null)
        // } else if (action === "no_like") {
        //   this.sendUserReact(this.userId,annId,false,null)
        // } else if (action === "dislike") {
        //   this.sendUserReact(this.userId,annId,null,true)
        // } else if (action === "no_dislike") {
        //   this.sendUserReact(this.userId,annId,null,false)
        // }

      }
    })
  }

  sendUserReact(idUser:any,idAnn:any,likes:any,dislikes:any){

    var trouv = false

    var index = 0

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
        likes: likes,
        dislikes: dislikes
      }).subscribe((res: any) => {

        this.userReacts[index].likes = likes != null ? likes : this.userReacts[index].likes
        this.userReacts[index].dislikes = dislikes != null ? dislikes : this.userReacts[index].dislikes


      })

    } else {
      this.reactCollService.postReactCol({
        idAnn: 8,
        idUser: parseInt(localStorage.getItem("idUser") + ""),
        likes: likes,
        dislikes: dislikes
      }).subscribe((res: any) => {

        this.userReacts[index].likes = likes != null ? likes : this.userReacts[index].likes
        this.userReacts[index].dislikes = dislikes != null ? dislikes : this.userReacts[index].dislikes

      })
    }

  }

  ngOnInit() {
    this.retrieveAllAnnouncements();
    this.loadComments();
    this.maxRaitingAryy = Array(5).fill(0);

    this.userId = parseInt(localStorage.getItem("idUser") + "")

    this.getAllReactsForUserConnected()





  }

}
