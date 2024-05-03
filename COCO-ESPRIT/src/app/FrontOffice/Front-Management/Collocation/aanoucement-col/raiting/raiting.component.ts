import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnoucementCollocationService } from 'src/app/BackOffice/Back-Core/Services/Collocation/annoucement-collocation.service';

@Component({
  selector: 'app-raiting',
  templateUrl: './raiting.component.html',
  styleUrls: ['./raiting.component.css']
})
export class RaitingComponent implements OnInit {

  @Input() maxRaiting = 5;
  maxRaitingAryy: any = [];
  @Input() SelectedStar = 0;
  previousSelection = 0;
  @Output()
  onRaiting: EventEmitter<number> = new EventEmitter<number>();

  constructor(private Annoucementservice: AnnoucementCollocationService,private route:ActivatedRoute) { }


  HandelMouseEnter(index: number) {
    this.SelectedStar = index + 1;
  }

  HandelMouseLeave() {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
    }
    else {
      this.SelectedStar = 0;
    }
  }
  /* HandelMouseLeave(){
     if (this.SelectedStar !== 0) {
         this.SelectedStar = 0; // Reset SelectedStar to 0 on mouse leave
       }
     }*/
  Raiting(index: number) {

    // var rateNbr = index+1

    // if (rateNbr > this.SelectedStar) {
    //   this.SelectedStar = rateNbr;
    //   var annId: any


    //   setTimeout(() => {
    //     if (annId !== null) {
    //       annId = localStorage.getItem("annId")
    //     }

    //     this.Annoucementservice.updatePostRating(parseInt(annId), rateNbr).subscribe({
    //       next: () => {
    //         alert("rated")
    //       }
    //     });
    //   }, 4000);
    // } else {
    //   this.SelectedStar = rateNbr;
    //   var annId: any

    //   setTimeout(() => {
    //     if (annId !== null) {
    //       annId = localStorage.getItem("annId")
    //     }

    //     this.Annoucementservice.updatePostRating(parseInt(annId), rateNbr).subscribe({
    //       next: () => {
    //         alert("rated")
    //       }
    //     });
    //   }, 4000);
    // }

    

  }

  ngOnInit(): void {
    this.maxRaitingAryy = Array(this.maxRaiting).fill(0);
  }
}