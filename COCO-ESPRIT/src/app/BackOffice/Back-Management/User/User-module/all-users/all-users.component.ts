import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/BackOffice/Back-Core/Models/User/User';
import { UserService } from 'src/app/BackOffice/Back-Core/Services/User/_services/user.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  users: User[];
  filteredUsers: User[];
  selectedUser: User | null = null; // Variable to store the selected user
  searchQuery: string = '';
  userCount: number = 0;
  usersWithCarsCount: number = 0;
  femaleUsersCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 8; // Number of items to display per page
  totalPages: number = 0; // Total number of pages
  @ViewChild('pieChart') pieChart: ElementRef;
  constructor(private userService: UserService) {
    this.userService.listen().subscribe((m:any)=>{
      this.retrieveAllUsers()
    });
  }

  ngOnInit(): void {
    this.retrieveAllUsers();
  }

  retrieveAllUsers(): void {
    this.userService.retrieveAllUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = [...this.users]; // Initialize filteredUsers with all users
      this.userCount = this.users.length - 1; // Update userCount
      this.usersWithCarsCount = this.calculateUsersWithCars();
      this.femaleUsersCount = this.calculateFemaleUsers();
      this.calculateTotalPages(); // Calculate total pages after retrieving users
      this.filterUsers(); // Apply pagination after retrieving users
      this.renderPieChart(); // Render pie chart after retrieving users
    });
  }

  showUserDetails(user: User): void {
    this.selectedUser = user;
  }

  closeUserDetails(): void {
    this.selectedUser = null;
  }

  filterUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).slice(startIndex, endIndex);
  }

  calculateUsersWithCars(): number {
    return this.users.filter(user => !!user.carUser).length;
  }

  calculateFemaleUsers(): number {
    return this.users.filter(
      user => user.gender && user.gender.toLowerCase() === 'female'
    ).length;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filterUsers();
  }


  renderPieChart(): void {
    const maleUsersCount = this.userCount-this.femaleUsersCount;
    console.log('huyyu',maleUsersCount);
    const pieChartCtx = this.pieChart.nativeElement.getContext('2d');

    new Chart(pieChartCtx, {
      type: 'pie',
      data: {
        
        labels: ['Male', 'Female'],
        datasets: [{
          data: [maleUsersCount, this.femaleUsersCount],
          backgroundColor: ['#36a2eb', '#ff6384'],
          hoverBackgroundColor: ['#36a2eb', '#ff6384']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
