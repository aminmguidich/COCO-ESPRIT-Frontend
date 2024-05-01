import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AnnouncementCarpooling } from './../../../../Back-Core/Models/Carpooling/announcement-carpooling';
import {  OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnouncementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/announcement-carpooling.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-table-announcement-carpooling',
  templateUrl: './table-announcement-carpooling.component.html',
  styleUrls: ['./table-announcement-carpooling.component.css'] ,
})
export class TableAnnouncementCarpoolingComponent implements AfterViewInit {
  data: AnnouncementCarpooling[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private annCarpoolingService: AnnouncementCarpoolingService,) { 
      this.annCarpoolingService.listen().subscribe((m:any)=>{
        console.log(m);
        this.loadData();
      })
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.data);
    }

 

  ngOnInit() {
    this.loadData()

  }
  


  deleteAnnCarpooling(id: number) {
    this.annCarpoolingService.deleteAnnCarpooling(id).subscribe(
      (response) => {
        alert(' Announcement deleted Successfully!');

       // this.router.navigate(['admin/carpooling/announcement/addAnn']);
       this.loadData();

      },
    )
  }
  loadData(){
    this.annCarpoolingService.getall().subscribe(
      (data: AnnouncementCarpooling[]) => {
        console.log(data);
        this.data = data;
        this.totalAnnouncements = data.length;

      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      }
    ;

  }

  totalAnnouncements!: number;


  displayedColumns: string[] = ['id', 'date', 'description', 'user','route'];
  dataSource: MatTableDataSource<AnnouncementCarpooling>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}