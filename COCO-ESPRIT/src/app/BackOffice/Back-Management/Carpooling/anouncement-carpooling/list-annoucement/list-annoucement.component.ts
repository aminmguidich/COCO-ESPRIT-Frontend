import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-annoucement',
  templateUrl: './list-annoucement.component.html',
  styleUrls: ['./list-annoucement.component.css']
})
export class ListAnnoucementComponent implements OnInit{
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  goAdd(): void {
    this.router.navigate(['carpooling/announcement/listAnn/addAnn']); // Navigate to the Add route
  }


}
