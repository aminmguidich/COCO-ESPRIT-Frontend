import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementCarpooling } from 'src/app/BackOffice/Back-Core/Models/Carpooling/requirement-carpooling';
import { RequirementCarpoolingService } from 'src/app/BackOffice/Back-Core/Services/Carpooling/requirement-carpooling.service';

@Component({
  selector: 'app-table-requirement',
  templateUrl: './table-requirement.component.html',
  styleUrls: ['./table-requirement.component.css']
})
export class TableRequirementComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'user',
    'date',
    'description',
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
          a.idCarRequirement,
          b.idCarRequirement,
          !isAsc
        );
      }
      switch ($event.active) {
        case 'id':
          return this.compare(
            a.idCarRequirement,
            b.idCarRequirement,
            isAsc
          );
        case 'user':
          return this.compare(
            a.usersRequirementCarpooling.username,
            b.usersRequirementCarpooling.username,
            isAsc
          );
        case 'date':
          return this.compare(
            a.dateCarpoolingRequirement.toString(),
            b.dateCarpoolingRequirement.toString(),
            isAsc
          );
        case 'description':
          return this.compare(a.description, b.description, isAsc);

        default:
          return 0;
      }
    });

    this.dataSource.data = this.data;
  }
  OnViewProfile(arg0: any) {
    throw new Error('Method not implemented.');
  }
  data: RequirementCarpooling[] = [];
  sortedData: RequirementCarpooling[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private reqCarpoolingService: RequirementCarpoolingService
  ) {
    /*this.reqCarpoolingService.listen().subscribe((m: any) => {
      this.loadData();
    });*/
  }

  ngOnInit() {
    this.loadData();
  }

  deleteReqCarpooling(id: number) {
    this.reqCarpoolingService.deleteReqCarpooling(id).subscribe((response) => {
      alert(' Requirement deleted Successfully!');

      // this.router.navigate(['admin/carpooling/announcement/addAnn']);
      this.loadData();
    });
  }
  loadData() {
    this.reqCarpoolingService
      .getall()
      .subscribe((data: RequirementCarpooling[]) => {
        this.reqCarpoolingService
          .getAllUsers()
          .subscribe(async (users: any[]) => {
            this.data = data.map((value, index, array) => {
              if (!value.usersRequirementCarpooling.id) {
                for (let index = 0; index < users.length; index++) {
                  const element = users[index];
                  if (
                    element.id.toString() == value.usersRequirementCarpooling.toString()
                  ) {
                    value.usersRequirementCarpooling = element;
                    break;
                  }
                }
              }
              return value;
            });
            this.totalRequirements = data.length;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
      }),
      (error: any) => {
        console.error('Error fetching user by ID:', error);
      };
  }

  totalRequirements!: number;

  dataSource: MatTableDataSource<RequirementCarpooling>;

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
