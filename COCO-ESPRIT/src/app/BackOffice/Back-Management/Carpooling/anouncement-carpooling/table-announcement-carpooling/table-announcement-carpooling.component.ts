import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnnouncementCarpooling } from './../../../../Back-Core/Models/Carpooling/announcement-carpooling';
import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnouncementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/announcement-carpooling.service';

@Component({
  selector: 'app-table-announcement-carpooling',
  templateUrl: './table-announcement-carpooling.component.html',
  styleUrls: ['./table-announcement-carpooling.component.css'],
})
export class TableAnnouncementCarpoolingComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'user',
    'date',
    'description',
    'price',
    'places',
    'reacts',
    'actions',
  ];
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  sortData($event: Sort) {
    if (!$event.active) {
      return;
    }
    this.data = this.data.sort((a, b) => {
      const isAsc = $event.direction === 'asc';
      if ($event.direction.length == 0) {
        return this.compare(
          a.idCarpoolingAnnouncement,
          b.idCarpoolingAnnouncement,
          !isAsc
        );
      }
      switch ($event.active) {
        case 'id':
          return this.compare(
            a.idCarpoolingAnnouncement,
            b.idCarpoolingAnnouncement,
            isAsc
          );
        case 'user':
          return this.compare(
            a.userAnnCarpooling.username,
            b.userAnnCarpooling.username,
            isAsc
          );
        case 'date':
          return this.compare(
            a.dateCarpoolingAnnouncement.toString(),
            b.dateCarpoolingAnnouncement.toString(),
            isAsc
          );
        case 'description':
          return this.compare(a.description, b.description, isAsc);
        case 'price':
          return this.compare(a.ridePrice, b.ridePrice, isAsc);
        case 'places':
          return this.compare(a.places, b.places, isAsc);
        case 'reacts':
          return this.compare(
            a.reactCarpoolingsAnnCarpooling.length,
            a.reactCarpoolingsAnnCarpooling.length,
            isAsc
          );
        default:
          return 0;
      }
    });

    this.dataSource.data = this.data;
  }
  OnViewProfile(arg0: any) {
    throw new Error('Method not implemented.');
  }
  data: AnnouncementCarpooling[] = [];
  sortedData: AnnouncementCarpooling[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private annCarpoolingService: AnnouncementCarpoolingService
  ) {
    this.annCarpoolingService.listen().subscribe((m: any) => {
      this.loadData();
    });
  }

  ngOnInit() {
    this.loadData();
  }

  deleteAnnCarpooling(id: number) {
    this.annCarpoolingService.deleteAnnCarpooling(id).subscribe((response) => {
      alert(' Announcement deleted Successfully!');

      // this.router.navigate(['admin/carpooling/announcement/addAnn']);
      this.loadData();
    });
  }
  loadData() {
    this.annCarpoolingService
      .getall()
      .subscribe((data: AnnouncementCarpooling[]) => {
        this.annCarpoolingService
          .getAllUsers()
          .subscribe(async (users: any[]) => {
            this.data = data.map((value, index, array) => {
              if (!value.userAnnCarpooling.id) {
                for (let index = 0; index < users.length; index++) {
                  const element = users[index];
                  if (
                    element.id.toString() == value.userAnnCarpooling.toString()
                  ) {
                    value.userAnnCarpooling = element;
                    break;
                  }
                }
              }
              return value;
            });
            this.totalAnnouncements = data.length;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      };
  }

  totalAnnouncements!: number;

  dataSource: MatTableDataSource<AnnouncementCarpooling>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
