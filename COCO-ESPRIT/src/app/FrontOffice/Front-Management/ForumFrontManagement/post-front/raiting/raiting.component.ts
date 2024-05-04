import { Component, EventEmitter, Input,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-raiting',
  templateUrl: './raiting.component.html',
  styleUrls: ['./raiting.component.css']
})
export class RaitingComponent implements OnInit {

  @Input() maxRaiting=5;
  maxRaitingAryy:any=[];
  @Input() SelectedStar=0;
  previousSelection =0;
  @Output() 
  onRaiting:EventEmitter<number>= new EventEmitter<number>();

  @Input() percentage: number; // Input property for percentage


  HandelMouseEnter(index:number){
this.SelectedStar=index+1;
  }
  
  HandelMouseLeave(){
  if(this.previousSelection!==0){
    this.SelectedStar = this.previousSelection;
  }
  else{
    this.SelectedStar=0;
  }
  }
  /*HandelMouseLeave(){
    if (this.SelectedStar !== 0) {
        this.SelectedStar = 0; // Reset SelectedStar to 0 on mouse leave
      }
    }*/
  Raiting(index: number) {
    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
    this.onRaiting.emit(this.SelectedStar);
    
    // Reset the SelectedStar after emitting the rating
    //alert('Rating submitted successfully!');
    this.SelectedStar = 0;

}

  ngOnInit(): void {
    this.maxRaitingAryy = Array(this.maxRaiting).fill(0);
  }
}
